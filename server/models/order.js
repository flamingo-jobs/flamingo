const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  merchant_id: { type: String },
  return_url: { type: String },
  cancel_url: { type: String },
  notify_url: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  city: { type: String },
  country: { type: String },
  items: { type: String },
  currency: { type: String },
  recurrence: { type: String },
  duration: { type: String },
  amount: { type: String },
  paymentDate: { type: Date },
  employer: { type: mongoose.Schema.Types.ObjectId },
});

module.exports = mongoose.model("Order", orderSchema);
