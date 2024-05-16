const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");

const productsRoutes = require("./routes/products-route");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/", productsRoutes);



app.listen(5000, { message: "connected to server" });
