const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Booking = require("../models/Booking");
const { sendBookingEmail } = require("../utils/mailer");

const JWT_SECRET = process.env.JWT_SECRET || "ja_homes_secret_key_12345";

// Helper to validate email format
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// Optional token decoding middleware
const decodeTokenOptional = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (!err) {
        req.user = decoded;
      }
      next();
    });
  } else {
    next();
  }
};

// @route   POST api/bookings
// @desc    Create a new private tour booking
router.post("/", decodeTokenOptional, async (req, res) => {
  const origin = req.headers.origin || "no-origin";
  console.log(`[BOOKING] Incoming submission from ${origin}`, { name: req.body?.name, email: req.body?.email, property: req.body?.property, date: req.body?.date });

  try {
    const { name, email, phone, date, timeSlot, tourType, property, config } = req.body;

    if (!name || !email || !phone || !date) {
      console.warn("[BOOKING] Validation failed — missing required fields");
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    if (!validateEmail(email)) {
      console.warn(`[BOOKING] Validation failed — invalid email: ${email}`);
      return res.status(400).json({ message: "Please enter a valid email address" });
    }

    // Validate booking date (must not be in the past)
    const bookingDateObj = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(bookingDateObj.getTime()) || bookingDateObj < today) {
      console.warn(`[BOOKING] Validation failed — invalid date: ${date}`);
      return res.status(400).json({ message: "Please choose a valid date in the future" });
    }

    const customId = "JAH-" + Math.floor(100000 + Math.random() * 900000);
    const newBooking = new Booking({
      _id: customId,
      name,
      email: email.toLowerCase(),
      phone,
      date,
      timeSlot: timeSlot || "10:00 AM",
      tourType: tourType || "In-Person Private Tour",
      property: property || "The Alpine Crest",
      config: config || null,
      userId: req.user ? req.user.id : null
    });

    await newBooking.save();
    console.log(`[BOOKING] ✅ Saved to DB — ID: ${customId}, property: ${property}, date: ${date}`);

    // Dispatch email confirmation asynchronously
    sendBookingEmail(newBooking).then(() => {
      console.log(`[BOOKING] ✅ Email dispatched for ${customId}`);
    }).catch(err => {
      console.error(`[BOOKING] ❌ Email failed for ${customId}:`, err.message);
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error("[BOOKING] ❌ Server error:", error.message);
    res.status(500).json({ message: "Server error during booking" });
  }
});

// @route   GET api/bookings
// @desc    Get bookings for a specific user (by token, or by email query parameter)
router.get("/", decodeTokenOptional, async (req, res) => {
  try {
    // If authenticated, return by userId or email
    if (req.user) {
      const filtered = await Booking.find({
        $or: [
          { userId: req.user.id },
          { email: req.user.email.toLowerCase() }
        ]
      }).sort({ createdAt: -1 });
      return res.json(filtered);
    }
    
    // If not authenticated, support email query parameter
    const queryEmail = req.query.email;
    if (queryEmail) {
      const filtered = await Booking.find({ email: queryEmail.toLowerCase() }).sort({ createdAt: -1 });
      return res.json(filtered);
    }
    
    // Otherwise, return empty for guests (privacy)
    res.json([]);
  } catch (error) {
    console.error("Fetch bookings error:", error);
    res.status(500).json({ message: "Server error fetching bookings" });
  }
});

// @route   DELETE api/bookings/:id
// @desc    Cancel a booking
router.delete("/:id", decodeTokenOptional, async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    
    // Authorization checks:
    // 1. Admins can delete any booking
    const isAdmin = req.user && req.user.role === "admin";

    if (!isAdmin) {
      // 2. If booking belongs to registered user, verify token matches owner
      if (booking.userId) {
        if (!req.user || req.user.id !== booking.userId) {
          return res.status(403).json({ message: "You are not authorized to cancel this booking" });
        }
      } else {
        // 3. For guest bookings:
        // - If logged in as another registered user, block deletion
        if (req.user && req.user.email.toLowerCase() !== booking.email.toLowerCase()) {
          return res.status(403).json({ message: "You are not authorized to cancel this booking" });
        }
        // - If an email query param is sent, ensure it matches the booking email
        const queryEmail = req.query.email;
        if (queryEmail && queryEmail.toLowerCase() !== booking.email.toLowerCase()) {
          return res.status(403).json({ message: "You are not authorized to cancel this booking" });
        }
      }
    }
    
    await Booking.deleteOne({ _id: id });
    res.json({ message: "Booking successfully cancelled", id });
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({ message: "Server error cancelling booking" });
  }
});

module.exports = router;


