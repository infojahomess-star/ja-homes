const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ja-homes";
    if (!process.env.MONGODB_URI) {
      console.warn("⚠️  MONGODB_URI not set — attempting local MongoDB fallback");
    }
    const conn = await mongoose.connect(connStr);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    console.error("Server will continue running but database operations will fail.");
    console.error("Please set the MONGODB_URI environment variable in your Render dashboard.");
    // Do NOT exit — keep the server alive so /api/health still responds
  }
};

module.exports = connectDB;
