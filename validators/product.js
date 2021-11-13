const { check, validationResult } = require("express-validator");

exports.validateCreateProduct = [
  check("title").not().isEmpty().withMessage("title is required"),
  check("description").not().isEmpty().withMessage("description is required"),
  check("image").not().isEmpty().withMessage("image is required"),
  check("categories").isArray().withMessage("categories is array"),
  check("size").isString().withMessage("size is string"),
  check("color").isString().withMessage("color is string"),
  check("price")
    .not()
    .isEmpty()
    .withMessage("price is required")
    .isNumeric()
    .withMessage("price is number"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array() });
    next();
  },
];
