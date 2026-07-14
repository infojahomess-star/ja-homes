const express = require("express");
const router = express.Router();
const { upload } = require("../config/cloudinary");
const { authenticateToken } = require("./auth");

// @route   POST api/upload
// @desc    Upload a single image file to Cloudinary (form key must be 'image')
// @access  Private
router.post("/", authenticateToken, upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded or file format not supported" });
    }

    res.json({
      message: "Image uploaded successfully to Cloudinary",
      url: req.file.path, // Cloudinary URL
      public_id: req.file.filename, // Cloudinary Asset Identifier
    });
  } catch (error) {
    console.error("Cloudinary upload route error:", error);
    res.status(500).json({ message: "Server error during file upload" });
  }
});

module.exports = router;
