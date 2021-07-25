const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  merchant_id: {
    type: String,
  },
  order_id: {
    type: String,
  },
  payhere_amount: {
    type: String,
  },
  payhere_currency: {
    type: String,
  },
  md5sig: {
    type: String,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
