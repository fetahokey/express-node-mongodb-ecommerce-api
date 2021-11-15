const {check , validationResult} = require('express-validator');

exports.validateCreateOrder = [
    check("userId", "UserId is missing").not().isEmpty(),
    check("products").custom(products=>{
        if(!Array.isArray(products))throw new Error('Products need to be an array')
        if (products.length == 0 ) throw new Error ('Product array cant be empty')
    }),
    check("amount", "Amount is missing").not().isEmpty(),
    check("address", "Address is missing").not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(400).json({ error: errors.array() });
        next();
    },
]
