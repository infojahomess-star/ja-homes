const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const CONTACT_FILE = path.join(__dirname, "../data/contact.json");

// Helper to read contacts
const readContacts = () => {
  try {
    const data = fs.readFileSync(CONTACT_FILE, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    return [];
  }
};

// Helper to write contacts
const writeContacts = (contacts) => {
  fs.writeFileSync(CONTACT_FILE, JSON.stringify(contacts, null, 2), "utf-8");
};

// @route   POST api/contact
// @desc    Submit a contact inquiry
router.post("/", (req, res) => {
  try {
    const { name, email, message, interest } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const contacts = readContacts();

    const newContact = {
      id: "CON-" + Math.floor(100000 + Math.random() * 900000),
      name,
      email: email.toLowerCase(),
      message,
      interest: interest || "General Inquiry",
      createdAt: new Date().toISOString()
    };

    contacts.push(newContact);
    writeContacts(contacts);

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
