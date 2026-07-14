require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";
app.use(cors({
  origin: corsOrigin,
  credentials: true
}));
app.use(express.json());

// Ensure data directory exists (kept for local backups/fallbacks)
const DATA_DIR = path.join(__dirname, "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Ensure database files exist
const initFile = (filename, defaultVal = "[]") => {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, defaultVal, "utf-8");
  }
};

initFile("users.json");
initFile("bookings.json");
initFile("contact.json");

// Import Routes
const authRoutes = require("./routes/auth");
const bookingsRoutes = require("./routes/bookings");
const contactRoutes = require("./routes/contact");
const adminRoutes = require("./routes/admin");
const uploadRoutes = require("./routes/upload");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);


// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "JA Homes Backend running" });
});

// 404 Handler for Unmatched Routes
app.use((req, res, next) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error("Unhandled server error:", err);
  res.status(err.status || 500).json({
    message: err.message || "An unexpected error occurred on the server",
    error: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

