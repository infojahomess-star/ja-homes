const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const Contact = require("../models/Contact");
const { sendContactEmail } = require("../utils/mailer");

// ── Rate Limiter ──────────────────────────────────────────────────────────────
// Max 5 submissions per IP per 15 minutes
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.ip,
  handler: (req, res) => {
    console.warn(`[CONTACT] 🚦 Rate limit hit from IP: ${req.ip}`);
    res.status(429).json({
      message: "Too many submissions from this address. Please wait 15 minutes before trying again."
    });
  }
});

// ── Validation Helpers ────────────────────────────────────────────────────────
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

const validatePhone = (phone) => {
  if (!phone) return true; // phone is optional
  const cleaned = phone.replace(/[\s\-().+]/g, "");
  return /^\d{7,15}$/.test(cleaned);
};

const VALID_INTERESTS = [
  "General Inquiry",
  "Co-Design Consultation",
  "Private Land Sourcing",
  "Media & Press"
];

// ── POST /api/contact ─────────────────────────────────────────────────────────
// PUBLIC — no auth required. Rate limited + honeypot + server-side validated.
router.post("/", contactLimiter, async (req, res) => {
  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.ip;
  const origin = req.headers.origin || "no-origin";

  console.log(`[CONTACT] Incoming from ${origin} | IP: ${ip}`, {
    name: req.body?.name,
    email: req.body?.email,
    interest: req.body?.interest
  });

  try {
    const { name, email, message, interest, phone, _honey } = req.body;

    // ── Honeypot check ────────────────────────────────────────────────────────
    // _honey is a hidden field — real users leave it blank, bots fill it
    if (_honey) {
      console.warn(`[CONTACT] 🍯 Honeypot triggered from IP: ${ip} — silently discarding`);
      // Return a fake success so bots don't know they were caught
      return res.status(201).json({ message: "Your message has been securely submitted to our concierge." });
    }

    // ── Required field checks ─────────────────────────────────────────────────
    if (!name || !email || !message) {
      console.warn("[CONTACT] ❌ Validation: missing required fields");
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // ── Field length limits ───────────────────────────────────────────────────
    if (name.trim().length < 2 || name.trim().length > 100) {
      return res.status(400).json({ message: "Name must be between 2 and 100 characters" });
    }
    if (message.trim().length < 5 || message.trim().length > 2000) {
      return res.status(400).json({ message: "Message must be between 5 and 2000 characters" });
    }

    // ── Email format ──────────────────────────────────────────────────────────
    if (!validateEmail(email)) {
      console.warn(`[CONTACT] ❌ Validation: invalid email — ${email}`);
      return res.status(400).json({ message: "Please enter a valid email address" });
    }
    if (email.length > 254) {
      return res.status(400).json({ message: "Email address is too long" });
    }

    // ── Phone format (optional) ───────────────────────────────────────────────
    if (phone && !validatePhone(phone)) {
      return res.status(400).json({ message: "Please enter a valid phone number (7–15 digits)" });
    }

    // ── Interest enum validation ──────────────────────────────────────────────
    const safeInterest = VALID_INTERESTS.includes(interest) ? interest : "General Inquiry";

    // ── Save to DB ────────────────────────────────────────────────────────────
    const customId = "CON-" + Math.floor(100000 + Math.random() * 900000);
    const newContact = new Contact({
      _id: customId,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone ? phone.trim() : "",
      message: message.trim(),
      interest: safeInterest
    });

    await newContact.save();
    console.log(`[CONTACT] ✅ Saved — ID: ${customId} | email: ${email} | interest: ${safeInterest}`);

    // ── Send emails (non-blocking) ────────────────────────────────────────────
    sendContactEmail(newContact)
      .then(() => console.log(`[CONTACT] ✅ Email dispatched for ${customId}`))
      .catch(err => console.error(`[CONTACT] ❌ Email failed for ${customId}:`, err.message));

    return res.status(201).json({
      message: "Your message has been securely submitted to our concierge.",
      contact: newContact
    });

  } catch (error) {
    console.error("[CONTACT] ❌ Server error:", error.message);
    return res.status(500).json({ message: "Server error submitting message" });
  }
});

module.exports = router;
