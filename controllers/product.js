const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

// @route POST /products
// @desc create new product
// @access Private
exports.createProduct = asyncHandler(async (req, res, next) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  if (savedProduct) {
    return res.status(201).json({ data: savedProduct });
  } else {
    return res.status(500).json({ error: "something went worng!" });
  }
});

// @route GET /products
// @desc get all products
// @access Private
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();

  if (products) {
    return res.status(201).json({ data: products });
  } else {
    return res.status(500).json({ error: "something went worng!" });
  }
});

// @route PUT /products/:id
// @desc update product
// @access Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  const updatedProduct = await Product.findByIdAndUpdate(productId);

  if (updatedProduct) {
    return res.status(201).json({ data: updatedProduct });
  } else {
    return res.status(500).json({ error: "something went worng!" });
  }
});
