const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

exports.createProduct = asyncHandler(async (req, res, next) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  if (savedProduct) {
    return res.status(201).json({ data: savedProduct });
  } else {
    return res.status(500).json({ error: "something went worng!" });
  }
});
