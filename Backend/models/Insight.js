const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Insight schema definition
const InsightSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  details: {
    type: String,
    trim: true,
  },
  confidence: {
    type: Number,
    min: 0,
    max: 1,
  },
  actionable: {
    type: Boolean,
    default: false,
  },
  read: {
    type: Boolean,
    default: false,
  },
  expirationDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the Insight model
module.exports = mongoose.model('Insight', InsightSchema);
