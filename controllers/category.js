const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findOne({id: id}).exec()
    .then((category) => {
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      req.category = category;
      next();
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    });
};

exports.getAllCategories = (req, res) => {

  Category.find()
    .then((categories) => {
        console.log('inside then', categories)
        if (!categories || categories.length === 0) {
          return res.status(404).json({ error: "No categories found" });
        }
      res.json(categories);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    });
};
