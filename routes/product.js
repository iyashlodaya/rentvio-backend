const express = require("express");
const router = express.Router();
const {
  getAllProducts, getProductsByCategory,
} = require("../controllers/product");

const { isSignedIn } = require("../controllers/auth");


// Route to get all categories
router.get("/products",isSignedIn, getAllProducts);

router.get("/products/:categoryId", isSignedIn, getProductsByCategory);

module.exports = router;
