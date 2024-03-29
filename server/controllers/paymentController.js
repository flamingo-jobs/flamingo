// https://support.payhere.lk/api-&-mobile-sdk/payhere-checkout
const stripe = require("stripe")(
  "sk_test_51JPAzhLTr96FRMgQ0xCmr03nHYxqHShBQZzOBnQ7mWo4JOTdrhy7yvPzbUEZ6iazCFCQBIRVu95cJFDqE3tgryG30076ZZjy9k"
);

const Payment = require("../models/payment");
const Order = require("../models/order");
const Employers = require("../models/employers");
const md5 = require("js-md5");
const MERCHANT_SECRET = process.env.MERCHANT_SECRET;

const payherePayment = async (req, res) => {
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
        res.status(500).json({
          success: false,
          error: "payment_save_failed (check model format)",
        });
      }
    } else {
      res.status(500).json({
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

const YOUR_DOMAIN = "http://localhost:3000/employer/billing";

const stripePayment = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        // TODO: replace this with the `price` of the product you want to sell
        price: "{{PRICE_ID}}",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });
  res.redirect(303, session.url);
};

const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json({ success: true, order: savedOrder._id });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const getOrderById = async (req, res) => {
  Order.findById(req.params.id).exec((err, savedOrder) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      order: savedOrder,
    });
  });
};

const getAllOrdersByEmployer = async (req, res) => {
  Order.find({ employer: req.params.id }, (err, previousOrders) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      previousOrders: previousOrders,
    });
  });
};

const getNextDate = async (req, res) => {
  Order.find({ employer: req.params.id }, async (err, previousOrders) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    let maxDate = null;
    let today = new Date().toISOString().slice(0, 10);
    if (previousOrders.length) {
      maxDate = new Date(
        Math.max.apply(
          null,
          previousOrders.map((x) => {
            return new Date(x.startDate);
          })
        )
      )
        .toISOString()
        .slice(0, 10);
    }
    let nextStartDate = maxDate ? await addMonths(maxDate, 1) : today;
    let nextEndDate = maxDate
      ? await addMonths(maxDate, 2)
      : await addMonths(today, 1);
    return res.status(200).json({
      success: true,
      nextDates: { nextStartDate, nextEndDate },
    });
  });
};

const addMonths = async (date, months) => {
  return new Date(new Date(date).getTime() + 30 * 24 * 60 * 60 * 1000 * months)
    .toISOString()
    .slice(0, 10);
};

module.exports = {
  payherePayment,
  stripePayment,
  createOrder,
  getOrderById,
  getAllOrdersByEmployer,
  getNextDate,
};
