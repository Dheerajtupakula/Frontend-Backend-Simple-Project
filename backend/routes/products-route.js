const express = require("express");
const uuid = require("uuid");

const routes = express.Router();
const DUMMY_PRODUCTS = [];

routes.get("/products", (req, res, next) => {
  res.status(200).json({ products: DUMMY_PRODUCTS });
});

routes.post("/products", (req, res, next) => {
  const { name, price } = req.body;

  if (!name || name.trim().length === 0 || !price || price <= 0) {
    return res.status(422).json({
      message: "Invalid input, please enter a valid name and price.",
    });
  }

  const createdProduct = {
    id: uuid.v4(),
    name,
    price,
  };

  DUMMY_PRODUCTS.push(createdProduct);

  res
    .status(201)
    .json({ message: "Created new product.", product: createdProduct });
});

module.exports = routes;
