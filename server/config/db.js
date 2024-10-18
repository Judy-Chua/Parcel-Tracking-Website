const mongoose = require("mongoose");

const connectDB = async () => {
  try {
      await mongoose.connect('mongodb://localhost/ParcelTrackerDB');
      console.log('MongoDB connected');
  } catch (err) {
      console.error('MongoDB connection error:', err);
      process.exit(1);  // exit program
  }
};

module.exports = connectDB;