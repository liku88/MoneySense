// Import required modules
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

// MongoDB connection URI from the .env file
const MONGODB_URI = process.env.MONGODB_URI;

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Connect to the MongoDB database using Mongoose
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Log a success message on successful connection
    console.log('MongoDB connected successfully');
  } catch (error) {
    // Log the error message and exit the process with a failure code
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

// Export the connectDB function for use in other parts of the application
module.exports = connectDB;
