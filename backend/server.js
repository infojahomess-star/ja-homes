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

// ── Startup Environment Audit ─────────────────────────────────────────────────
const REQUIRED_ENV = ["MONGODB_URI", "JWT_SECRET", "RESEND_API_KEY", "ADMIN_EMAIL", "CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET", "EMAIL_FROM"];
console.log("─── JA Homes Backend Startup ───────────────────────────────");
console.log(`   NODE_ENV : ${process.env.NODE_ENV || "not set (defaulting to development)"}`);
console.log(`   PORT     : ${process.env.PORT || 5000}`);
REQUIRED_ENV.forEach(key => {
  const val = process.env[key];
  console.log(`   ${key.padEnd(24)}: ${val ? "✅ SET" : "❌ MISSING"}`);
});
console.log("────────────────────────────────────────────────────────────");


// ── CORS Configuration ───────────────────────────────────────────────────────
// Hardcoded production origins — do NOT rely on env var parsing alone
const HARDCODED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://jahomess.com",
  "https://www.jahomess.com",
  "https://ja-homes.vercel.app",
  "https://ja-homes.onrender.com"
];

// Merge with any additional origins from env (for future flexibility)
const extraOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map(o => o.trim()).filter(Boolean)
  : [];

const allowedOrigins = [...new Set([...HARDCODED_ORIGINS, ...extraOrigins])];

console.log("✅ CORS allowed origins:", allowedOrigins);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, curl, mobile apps, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`🚫 CORS blocked request from origin: ${origin}`);
      callback(new Error(`CORS: Origin ${origin} not allowed`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"]
};

// Apply CORS — must be before all routes
app.use(cors(corsOptions));

// Explicitly handle OPTIONS preflight for all routes
app.options("*", cors(corsOptions));
app.use(express.json());

// ── Request Logger ────────────────────────────────────────────────────────────
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    const origin = req.headers.origin || "no-origin";
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms) from ${origin}`);
  });
  next();
});


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


// Root API Welcome / Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "JA Homes Backend API is running successfully.",
    version: "1.0.0",
    status: "online",
    timestamp: new Date().toISOString()
  });
});

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

