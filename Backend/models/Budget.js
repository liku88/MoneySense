const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Budget schema definition
const BudgetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  customCategory: String,
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  isRecurring: {
    type: Boolean,
    default: false,
  },
  recurrenceFrequency: {
    type: String,
    enum: ['weekly', 'monthly', 'quarterly', 'yearly'],
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active',
  },
  currency: String,
  currentAmount: {
    type: Number,
    default: 0,
  },
  progress: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the Budget model
module.exports = mongoose.model('Budget', BudgetSchema);
