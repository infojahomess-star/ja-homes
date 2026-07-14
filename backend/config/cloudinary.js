const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dummy_cloud",
  api_key: process.env.CLOUDINARY_API_KEY || "dummy_key",
  api_secret: process.env.CLOUDINARY_API_SECRET || "dummy_secret",
});

// Configure Multer storage to stream files directly to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ja-homes-luxury",
    allowed_formats: ["jpg", "png", "jpeg", "webp", "gif"],
    transformation: [{ width: 1600, height: 1600, crop: "limit" }], // upscale limit
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

module.exports = {
  cloudinary,
  upload,
};
