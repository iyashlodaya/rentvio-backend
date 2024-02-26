const express = require("express");
const router = express.Router();
const {
  getAllProducts, getProductsByCategory,
} = require("../controllers/product");

const { isSignedIn } = require("../controllers/auth");


// Route to get all categories
router.get("/products", getAllProducts);

router.get("/products/:categoryId", getProductsByCategory);

module.exports = router;
