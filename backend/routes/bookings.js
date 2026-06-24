const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const BOOKINGS_FILE = path.join(__dirname, "../data/bookings.json");
const JWT_SECRET = process.env.JWT_SECRET || "ja_homes_secret_key_12345";

// Helper to read bookings
const readBookings = () => {
  try {
    const data = fs.readFileSync(BOOKINGS_FILE, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    return [];
  }
};

// Helper to write bookings
const writeBookings = (bookings) => {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), "utf-8");
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
router.post("/", decodeTokenOptional, (req, res) => {
  try {
    const { name, email, phone, date, timeSlot, tourType, property, config } = req.body;

    if (!name || !email || !phone || !date) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const bookings = readBookings();
    
    const newBooking = {
      id: "JAH-" + Math.floor(100000 + Math.random() * 900000),
      name,
      email: email.toLowerCase(),
      phone,
      date,
      timeSlot: timeSlot || "10:00 AM",
      tourType: tourType || "In-Person Private Tour",
      property: property || "The Alpine Crest",
      config: config || null,
      userId: req.user ? req.user.id : null,
      createdAt: new Date().toISOString()
    };

    bookings.unshift(newBooking);
    writeBookings(bookings);

    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Booking creation error:", error);
    res.status(500).json({ message: "Server error during booking" });
  }
});

// @route   GET api/bookings
// @desc    Get bookings for a specific user (by token, or by email query parameter)
router.get("/", decodeTokenOptional, (req, res) => {
  try {
    const bookings = readBookings();
    
    // If authenticated, return by userId or email
    if (req.user) {
      const filtered = bookings.filter(
        (b) => b.userId === req.user.id || b.email.toLowerCase() === req.user.email.toLowerCase()
      );
      return res.json(filtered);
    }
    
    // If not authenticated, support email query parameter
    const queryEmail = req.query.email;
    if (queryEmail) {
      const filtered = bookings.filter((b) => b.email.toLowerCase() === queryEmail.toLowerCase());
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
router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const bookings = readBookings();
    
    const index = bookings.findIndex((b) => b.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Booking not found" });
    }
    
    bookings.splice(index, 1);
    writeBookings(bookings);
    
    res.json({ message: "Booking successfully cancelled", id });
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({ message: "Server error cancelling booking" });
  }
});

module.exports = router;
