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



router.post('/' , verifyTokenAndAuthorization, validateCreateOrder , createOrder);

router.get('/:id' , verifyTokenAndAuthorization , getAnOrder);

router.put('/:id', verifyTokenAndAuthorization , validateCreateOrder, updateOrder);

router.delete('/:id' , verifyTokenAndAuthorization, deleteOrder);

//get All orders of a particular user
router.get('/find/:userId', verifyTokenAndAuthorization , getUserOrders);

// Admin get all orders
router.get('/' , verifyTokenAndAdmin ,getAllOrders);


// router.get('/income' , getMonthlyIncome);

module.exports = router;
