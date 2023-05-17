const express = require('express');
const app = express();
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const passport = require('passport');
const session = require('express-session');

const port = process.env.PORT || 3000;

// Connect to the MongoDB database
connectDB();
require('dotenv').config();


// Middleware
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }));  

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Include the Passport.js configuration
require('./config/passport');


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

module.exports = app;