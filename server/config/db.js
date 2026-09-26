const mongoose = require('mongoose');

/**
 * Connect to MongoDB Database using Mongoose
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/colabz');
    console.log(`[Database] MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database Error] Connection failed: ${error.message}`);
    // In initial setup, if local MongoDB service is not started, print a helpful message
    console.warn('[Database Hint] Ensure MongoDB service is running on your system or update MONGO_URI in .env');
  }
};

module.exports = connectDB;
