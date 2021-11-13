const { createProduct } = require("../controllers/product");
const { verifyTokenAndAdmin } = require("../utils/verifyToken");
const { validateCreateProduct } = require("../validators/product");

const router = require("express").Router();

router.post("/", verifyTokenAndAdmin, validateCreateProduct, createProduct);

module.exports = router;
