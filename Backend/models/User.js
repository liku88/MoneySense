const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User schema definition
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,
  avatarUrl: String,
  darkMode: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'superadmin'],
    default: 'user',
  },
  accountVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  verificationTokenExpiration: Date,
  passwordResetToken: String,
  passwordResetTokenExpiration: Date,
  lastLogin: Date,
  lastPasswordChange: Date,
  googleId: String,
  facebookId: String,
  emailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: String,
  emailVerificationTokenExpires: Date,
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'basic', 'premium'],
      default: 'free',
    },
    expirationDate: Date,
    paymentStatus: {
      type: String,
      enum: ['active', 'inactive', 'past_due'],
      default: 'inactive',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the User model
module.exports = mongoose.model('User', UserSchema);
