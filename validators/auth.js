const { check, validationResult } = require("express-validator");

exports.validateRegisterUser = [
  check("username").not().isEmpty().withMessage("username is required"),
  check("email", "email set a email").not().isEmpty().isEmail(),
  check("password", "please set a password").not().isEmpty(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array() });
    next();
  },
];
