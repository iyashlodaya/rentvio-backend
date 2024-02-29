const express = require("express");
const { createOrder } = require("../controllers/order");
const router = express.Router();

router.post("/orders/create", createOrder);

module.exports = router;
