require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const stripeRoutes = require("./routes/stripe.js");
const categoriesRoutes = require("./routes/category.js");
const productsRoutes = require("./routes/product.js");
const orderRoutes = require("./routes/order.js");

// DB CONNECTION
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED !!! ");
  });

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// PORT
const port = process.env.PORT || 8000;

// My Routes
app.use("/api", authRoutes);
app.use("/api", categoriesRoutes);
app.use("/api", productsRoutes);
app.use("/api", userRoutes);
app.use("/api", stripeRoutes);
app.use("/api", orderRoutes);

// Starting The Server:
app.listen(port, () => {
  console.log(`Server started and running at ${port}`);
});
