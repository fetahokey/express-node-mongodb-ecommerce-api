const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./connect");

dotenv.config();
connectDB();
const app = express();

app.listen(5000, () => {
  console.log("Backend server is running ..");
});
