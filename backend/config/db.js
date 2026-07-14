const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Fallback to local MongoDB instance if MONGODB_URI is not set
    const connStr = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ja-homes";
    const conn = await mongoose.connect(connStr);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
