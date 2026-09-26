const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/codetogether", {
      serverSelectionTimeoutMS: 2500,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.warn("MongoDB connection warning:", error.message);
    console.warn("Express server continuing (MongoDB optional for UI/AI dev).");
  }
};

module.exports = connectDB;
