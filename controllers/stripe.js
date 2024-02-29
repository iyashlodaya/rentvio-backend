const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.payDeposit = async (req, res) => {
  try {
    const {
      user_id,
      cart_items,
      total_monthly_rent_to_be_paid,
      total_refundable_deposit,
    } = req.body;

    console.log('user_id', user_id);
    console.log('cart-items', cart_items);
    console.log('total_monthly_rent_to_be_paid', total_monthly_rent_to_be_paid);
    console.log('total_refundable_deposit', total_refundable_deposit);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total_refundable_deposit * 100,
      currency: "inr",
      payment_method_types: ["card"],
      payment_method_options: {
        card: {
          request_three_d_secure: "challenge",
        },
      },
    });

    console.log('paymentIntent', paymentIntent);

    res.status(201).json({client_secret: paymentIntent.client_secret});
  } catch (error) {
    console.log("Error in pay Deposit API!", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
