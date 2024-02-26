const express = require("express");
const router = express.Router();
const {
  getCategoryById,
  getAllCategories,
} = require("../controllers/category");
const {isSignedIn } = require("../controllers/auth");

// Middleware to handle requests for specific category ID
router.param("categoryId", getCategoryById);

// Route to get a category by its ID
router.get("/category/:categoryId", isSignedIn, (req, res) => {
  res.json(req.category);
});

// Route to get all categories
router.get("/categories", getAllCategories);

module.exports = router;
