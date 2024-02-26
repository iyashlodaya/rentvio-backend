const Order = require("../models/order");

exports.createOrder = async (req, res) => {
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
    const order = new Order({
      user: user_id,
      cart_items,
      total_monthly_rent_to_be_paid,
      total_refundable_deposit,
    });

    await order.save();
    console.log("Success in creating order!", order);
    res.status(201).json(order);
  } catch (error) {
    console.log("Error in creating order!", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
