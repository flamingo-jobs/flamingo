// https://support.payhere.lk/api-&-mobile-sdk/payhere-checkout

const Payment = require("../models/payment");
const Employers = require("../models/employers");
const MERCHANT_SECRET = require("../Config").MERCHANT_SECRET;
const md5 = require("js-md5");

const acceptPayment = async (req, res) => {
  const newPayment = new Payment(req.body);
  const {
    merchant_id,
    order_id,
    payhere_amount,
    payhere_currency,
    status_code,
    md5sig,
  } = newPayment;
  try {
    local_md5sig = strtoupper(
      md5(
        [
          merchant_id,
          order_id,
          payhere_amount,
          payhere_currency,
          status_code,
          strtoupper(md5(MERCHANT_SECRET)),
        ].join("")
      )
    );
    if (local_md5sig === md5sig && status_code === 2) {
      const savedPayment = await newPayment.save();
      if (savedPayment) {
          
        /*
        ......................................................
        >> Update employer document with subscribed package <<
        ......................................................
        */

        res.status(200).json({
          success: true,
        });
      } else {
        res.status(400).json({
          success: false,
          error: "payment_save_failed (check model format)",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        error: "bad_payment",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err,
    });
  }
};

module.exports = { acceptPayment };
