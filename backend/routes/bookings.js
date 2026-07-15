const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");
const Booking = require("../models/Booking");
const { sendBookingEmail } = require("../utils/mailer");

const JWT_SECRET = process.env.JWT_SECRET || "ja_homes_secret_key_12345";

// ── Rate Limiter ──────────────────────────────────────────────────────────────
// Max 5 booking submissions per IP per 15 minutes
const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.ip,
  handler: (req, res) => {
    console.warn(`[BOOKING] 🚦 Rate limit hit from IP: ${req.ip}`);
    res.status(429).json({
      message: "Too many booking requests from this address. Please wait 15 minutes before trying again."
    });
  }
});

// ── Validation Helpers ────────────────────────────────────────────────────────
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

const validatePhone = (phone) => {
  const cleaned = phone.replace(/[\s\-().+]/g, "");
  return /^\d{7,15}$/.test(cleaned);
};

const VALID_TOUR_TYPES = [
  "In-Person Private Tour",
  "Virtual Guided Tour",
  "Drone Flyover Tour"
];

const VALID_PROPERTIES = [
  "The Alpine Crest",
  "Om Sai Ashraya",
  "Custom Configured Estate"
];

const VALID_TIME_SLOTS = [
  "10:00 AM",
  "01:00 PM",
  "04:00 PM",
  "07:00 PM"
];

// ── Optional JWT decode (enriches req.user if logged in, doesn't block if not) ─
const decodeTokenOptional = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (!err) req.user = decoded;
      next();
    });
  } else {
    next();
  }
};

// ── POST /api/bookings ────────────────────────────────────────────────────────
// PUBLIC — no auth required. Rate limited + honeypot + server-side validated.
router.post("/", bookingLimiter, decodeTokenOptional, async (req, res) => {
  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.ip;
  const origin = req.headers.origin || "no-origin";

  console.log(`[BOOKING] Incoming from ${origin} | IP: ${ip}`, {
    name: req.body?.name,
    email: req.body?.email,
    property: req.body?.property,
    date: req.body?.date
  });

  try {
    const { name, email, phone, date, timeSlot, tourType, property, config, _honey } = req.body;

    // ── Honeypot check ────────────────────────────────────────────────────────
    if (_honey) {
      console.warn(`[BOOKING] 🍯 Honeypot triggered from IP: ${ip} — silently discarding`);
      const fakeId = "JAH-" + Math.floor(100000 + Math.random() * 900000);
      return res.status(201).json({ _id: fakeId, id: fakeId, name, email, phone, date, timeSlot, tourType, property });
    }

    // ── Required fields ───────────────────────────────────────────────────────
    if (!name || !email || !phone || !date) {
      console.warn("[BOOKING] ❌ Validation: missing required fields");
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // ── Field length limits ───────────────────────────────────────────────────
    if (name.trim().length < 2 || name.trim().length > 100) {
      return res.status(400).json({ message: "Name must be between 2 and 100 characters" });
    }

    // ── Email format ──────────────────────────────────────────────────────────
    if (!validateEmail(email)) {
      console.warn(`[BOOKING] ❌ Validation: invalid email — ${email}`);
      return res.status(400).json({ message: "Please enter a valid email address" });
    }
    if (email.length > 254) {
      return res.status(400).json({ message: "Email address is too long" });
    }

    // ── Phone format ──────────────────────────────────────────────────────────
    if (!validatePhone(phone)) {
      return res.status(400).json({ message: "Please enter a valid phone number (7–15 digits)" });
    }

    // ── Date validation ───────────────────────────────────────────────────────
    const bookingDateObj = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(bookingDateObj.getTime()) || bookingDateObj < today) {
      console.warn(`[BOOKING] ❌ Validation: invalid date — ${date}`);
      return res.status(400).json({ message: "Please choose a valid future date" });
    }

    // ── Enum sanitisation (accept only known values, fall back gracefully) ────
    const safeTimeSlot = VALID_TIME_SLOTS.includes(timeSlot) ? timeSlot : "10:00 AM";
    const safeTourType = VALID_TOUR_TYPES.includes(tourType) ? tourType : "In-Person Private Tour";
    const safeProperty = VALID_PROPERTIES.includes(property) ? property : "The Alpine Crest";

    // ── Config sanitisation (custom estate) ───────────────────────────────────
    let safeConfig = null;
    if (safeProperty === "Custom Configured Estate" && config && typeof config === "object") {
      safeConfig = {
        cladding: String(config.cladding || "Standard").slice(0, 100),
        flooring: String(config.flooring || "Standard").slice(0, 100),
        amenity:  String(config.amenity  || "Standard").slice(0, 100),
        totalPrice: String(config.totalPrice || "0").slice(0, 30)
      };
    }

    // ── Save to DB ────────────────────────────────────────────────────────────
    const customId = "JAH-" + Math.floor(100000 + Math.random() * 900000);
    const newBooking = new Booking({
      _id: customId,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      date,
      timeSlot: safeTimeSlot,
      tourType: safeTourType,
      property: safeProperty,
      config: safeConfig,
      userId: req.user ? req.user.id : null
    });

    await newBooking.save();
    console.log(`[BOOKING] ✅ Saved — ID: ${customId} | property: ${safeProperty} | date: ${date} | auth: ${req.user ? "yes" : "guest"}`);

    // ── Send emails (non-blocking) ────────────────────────────────────────────
    sendBookingEmail(newBooking)
      .then(() => console.log(`[BOOKING] ✅ Email dispatched for ${customId}`))
      .catch(err => console.error(`[BOOKING] ❌ Email failed for ${customId}:`, err.message));

    return res.status(201).json(newBooking);

  } catch (error) {
    console.error("[BOOKING] ❌ Server error:", error.message);
    return res.status(500).json({ message: "Server error during booking" });
  }
});

// ── GET /api/bookings ─────────────────────────────────────────────────────────
// Returns bookings scoped to the authenticated user, or by email query param for guests.
// Returns empty array for completely unauthenticated requests with no email param (privacy).
router.get("/", decodeTokenOptional, async (req, res) => {
  try {
    if (req.user) {
      const filtered = await Booking.find({
        $or: [
          { userId: req.user.id },
          { email: req.user.email.toLowerCase() }
        ]
      }).sort({ createdAt: -1 });
      return res.json(filtered);
    }

    const queryEmail = req.query.email;
    if (queryEmail) {
      if (!validateEmail(queryEmail)) return res.json([]);
      const filtered = await Booking.find({ email: queryEmail.toLowerCase() }).sort({ createdAt: -1 });
      return res.json(filtered);
    }

    return res.json([]);
  } catch (error) {
    console.error("[BOOKING] ❌ Fetch error:", error.message);
    return res.status(500).json({ message: "Server error fetching bookings" });
  }
});

// ── DELETE /api/bookings/:id ──────────────────────────────────────────────────
// Ownership-checked: only the booking owner or an admin can cancel.
router.delete("/:id", decodeTokenOptional, async (req, res) => {
  try {
    const { id } = req.params;

    // Sanitise ID format to prevent injection
    if (!/^JAH-\d{6}$/.test(id)) {
      return res.status(400).json({ message: "Invalid booking ID format" });
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const isAdmin = req.user && req.user.role === "admin";

    if (!isAdmin) {
      if (booking.userId) {
        if (!req.user || req.user.id !== booking.userId) {
          return res.status(403).json({ message: "You are not authorised to cancel this booking" });
        }
      } else {
        if (req.user && req.user.email.toLowerCase() !== booking.email.toLowerCase()) {
          return res.status(403).json({ message: "You are not authorised to cancel this booking" });
        }
        const queryEmail = req.query.email;
        if (queryEmail && queryEmail.toLowerCase() !== booking.email.toLowerCase()) {
          return res.status(403).json({ message: "You are not authorised to cancel this booking" });
        }
      }
    }

    await Booking.deleteOne({ _id: id });
    console.log(`[BOOKING] ✅ Cancelled — ID: ${id}`);
    return res.json({ message: "Booking successfully cancelled", id });

  } catch (error) {
    console.error("[BOOKING] ❌ Cancel error:", error.message);
    return res.status(500).json({ message: "Server error cancelling booking" });
  }
});

module.exports = router;
