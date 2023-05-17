const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Transaction schema definition
const TransactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  customCategory: String,
  transactionType: {
    type: String,
    enum: ['income', 'expense'],
    required: true,
  },
  date: {
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
  nextRecurrenceDate: Date,
  attachments: [
    {
      url: String,
      name: String,
      size: Number,
    },
  ],
  currency: String,
  exchangeRate: Number,
  paymentMethod: {
    type: String,
    enum: ['cash', 'credit_card', 'debit_card', 'bank_transfer', 'mobile_payment'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the Transaction model
module.exports = mongoose.model('Transaction', TransactionSchema);
