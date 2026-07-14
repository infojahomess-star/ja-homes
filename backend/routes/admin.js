const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Booking = require("../models/Booking");
const Contact = require("../models/Contact");

const JWT_SECRET = process.env.JWT_SECRET || "ja_homes_secret_key_12345";

// Middleware to verify JWT token and ensure user has the admin role
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Administrative privileges required." });
    }

    req.user = user;
    next();
  });
};

// @route   GET api/admin/bookings
// @desc    Retrieve all bookings in the system
router.get("/bookings", authenticateAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error("Admin fetch bookings error:", error);
    res.status(500).json({ message: "Server error fetching bookings" });
  }
});

// @route   GET api/admin/contacts
// @desc    Retrieve all contact inquiries submitted
router.get("/contacts", authenticateAdmin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error("Admin fetch contacts error:", error);
    res.status(500).json({ message: "Server error fetching contacts" });
  }
});

// @route   DELETE api/admin/contacts/:id
// @desc    Dismiss or resolve a contact inquiry
router.delete("/contacts/:id", authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    
    if (!contact) {
      return res.status(404).json({ message: "Contact inquiry not found" });
    }
    
    await Contact.deleteOne({ _id: id });
    res.json({ message: "Contact inquiry successfully resolved", id });
  } catch (error) {
    console.error("Admin resolve contact error:", error);
    res.status(500).json({ message: "Server error resolving contact inquiry" });
  }
});

module.exports = router;

