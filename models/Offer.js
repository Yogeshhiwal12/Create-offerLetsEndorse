const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  offerCode: { type: String, required: true, maxlength: 8 },
  offerTitle: { type: String, required: true, maxlength: 60 },
  offerDescription: { type: String, maxlength: 140 },
  offerType: { type: String, required: true },
  discountPercentage: Number,
  applicableOn: { type: String, required: true },
  minValue: { type: Number, required: true },
  maxValue: Number,
  startDate: { type: Date, required: true },
  expiryDate: Date,
  limitedCustomers: { type: Boolean, default: false },
  totalCustomers: Number,
  limitedUsage: { type: Boolean, default: false },
  usagePerCustomer: Number,
});

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
