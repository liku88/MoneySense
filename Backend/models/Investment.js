const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Investment schema definition
const InvestmentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  investmentName: {
    type: String,
    required: true,
    trim: true,
  },
  investmentType: {
    type: String,
    required: true,
    trim: true,
  },
  initialAmount: {
    type: Number,
    required: true,
  },
  currentValue: {
    type: Number,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
  currency: String,
  status: {
    type: String,
    enum: ['active', 'sold', 'transferred'],
    default: 'active',
  },
  return: Number,
  returnPercentage: Number,
  assetAllocation: [
    {
      assetClass: String,
      percentage: Number,
    },
  ],
  ticker: String,
  notes: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the Investment model
module.exports = mongoose.model('Investment', InvestmentSchema);
