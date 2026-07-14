const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const { sendContactEmail } = require("../utils/mailer");

// Helper to validate email format
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// @route   POST api/contact
// @desc    Submit a contact inquiry
router.post("/", async (req, res) => {
  try {
    const { name, email, message, interest, phone } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }

    const customId = "CON-" + Math.floor(100000 + Math.random() * 900000);
    const newContact = new Contact({
      _id: customId,
      name,
      email: email.toLowerCase(),
      phone: phone || "",
      message,
      interest: interest || "General Inquiry"
    });

    await newContact.save();

    // Dispatch email notification asynchronously
    sendContactEmail(newContact);

    res.status(201).json({
      message: "Your message has been securely submitted to our concierge.",
      contact: newContact
    });
  } catch (error) {
    console.error("Contact submit error:", error);
    res.status(500).json({ message: "Server error submitting message" });
  }
});

module.exports = router;


