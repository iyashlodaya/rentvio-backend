const Product = require("../models/product");

exports.getAllProducts = (req, res) => {
  Product.find()
    .then((products) => {
      console.log("inside get All Products", products);
      if (!products || products.length === 0) {
        return res.status(404).json({ error: "No Products found" });
      }
      res.json(products);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    });
};

exports.getProductsByCategory = (req, res) => {
  console.log('req.params', req.params);
  let categoryId = req.params.categoryId;

  Product.find({ categoryId: categoryId })
    .then((products) => {
      console.log("inside products by category", products);
      if (!products || products.length === 0) {
        return res.status(404).json({ error: "No Products found" });
      }
      res.json(products);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    });
};

