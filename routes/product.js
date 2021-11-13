const {
  createProduct,
  getAllProducts,
  updateProduct,
} = require("../controllers/product");
const { verifyTokenAndAdmin } = require("../utils/verifyToken");
const { validateCreateProduct } = require("../validators/product");

const router = require("express").Router();

router.post("/", verifyTokenAndAdmin, validateCreateProduct, createProduct);

router.get("/", verifyTokenAndAdmin, getAllProducts);

router.put("/:id", verifyTokenAndAdmin, updateProduct);

module.exports = router;
