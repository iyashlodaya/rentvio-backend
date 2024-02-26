const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const router = express.Router();

router.post("/create-subscription", async (req, res) => {
  try {
    const { cartItems } = req.body;
    let totalRefundableDeposit = 0;

    //calculate total refund.
    cartItems.forEach((item)=> {
      totalRefundableDeposit = totalRefundableDeposit + item.productInfo.productRefundableDeposit; 
    });

    //create stripe customer
    const customer = await stripe.customers.create({
        name: 'Yash Lodaya',
    });

    // handle refundable deposit collection
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalRefundableDeposit * 100,
      currency: "inr",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    //create subscription
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const nextMonthTimestamp = Math.floor(nextMonth.getTime() / 1000); // Convert to seconds


    const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: cartItems.map(product => ({price: product.productInfo.priceId})),
        billing_cycle_anchor: nextMonthTimestamp,
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        trial_end: nextMonthTimestamp,
    });

    console.log('customer', customer)
    console.log('paymentIntent', paymentIntent)
    console.log('subscription', subscription)

    res.status(200).json({
        customer: customer,
        clientSecret: paymentIntent.client_secret,
        subscription: subscription,
      });

  } catch (error) {
    console.log('Error Occured in Create Subscription API', error);
    res.status(500).json({
        error: error.message,
      });
  }
});

module.exports = router;