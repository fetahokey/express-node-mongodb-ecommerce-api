const router = require("express").Router();
const {createOrder, 
    getAnOrder,
    getUserOrders ,
    updateOrder ,
    deleteOrder ,
    getAllOrders,
    getMonthlyIncome} = require('../controllers/order'); 
const {validateCreateOrder} = require('../validators/orders');
const {verifyTokenAndAuthorization , verifyTokenAndAdmin} = require('../utils/verifyToken')



router.post('/orders' , verifyTokenAndAuthorization, validateCreateOrder , createOrder);

router.get('/orders/:id' , verifyTokenAndAuthorization, getAnOrder);

router.put('/orders/:id', verifyTokenAndAuthorization , validateCreateOrder, updateOrder);

router.delete('/orders/:id' , verifyTokenAndAuthorization, deleteOrder);

//get All orders of a particular user
router.get('orders/find/:userId', verifyTokenAndAuthorization , getUserOrders);

// Admin get all orders
router.get('/orders' , verifyTokenAndAdmin ,getAllOrders);


router.get('/orders/income/find',verifyTokenAndAdmin  , getMonthlyIncome);

module.exports = router;
