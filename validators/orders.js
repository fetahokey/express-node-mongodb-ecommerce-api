const {check , validationResult} = require('express-validator');

exports.validateCreateOrder = [
    check("userId", "UserId is missing").not().isEmpty(),
    check("products" , "Products cant be empty").not().isEmpty(),
    check("amount", "Amount is missing").not().isEmpty(),
    check("address", "Address is missing").not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(400).json({ error: errors.array() });
        next();
    },
]
