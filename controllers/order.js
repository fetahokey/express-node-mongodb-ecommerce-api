const asyncHandler = require('express-async-handler');
const Order        = require('../models/Order');


// @route POST /orders/
// @descp Create a new Order
// @access Private
exports.createOrder = asyncHandler(async (req , res , next)=>{
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    if(!savedOrder){
        res.status(500).json({error : "Something went wrong"})
    }else{
        res.status(200).json({order : savedOrder})
    }
})

// @route GET /orders/:id
// @descp Get an Order
// @access Private
exports.getAnOrder = asyncHandler(async (req , res , next)=>{
    const orderId = req.params.id;
    const foundOrder = await Order.findById(orderId);
    if(!foundOrder){
        res.status(404).json({error : "Resource not found"});
    }else{
        res.status(200).json({order : foundOrder})
    }
})

// @route PUT /orders/:id
// @descp Edit an order
// @access Private
exports.updateOrder = asyncHandler(async (req , res , next)=>{
    const orderId = req.params.id;
   
    //check if order exists
    const order = await Order.findById(orderId);
    if(!order) return res.status(404).json({error : "Order not found"})

    updatedOrder = await Order.findByIdAndUpdate(orderId , req.body);
    if(!updatedOrder){
        res.status(500).json({error : "Something went wrong"});
    }else{
        res.status(200).json({order : updatedOrder});
    }
})

// @route DELETE /orders/:id
// @descp Delete an Order
// @access Private
exports.deleteOrder = asyncHandler(async (req , res , next)=>{
    const orderId = req.params.id;

    const order = await Order.findById(orderId);
    if(!order) return res.status(404).json({error : "Order not found"})
    
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if(!deletedOrder){
        res.status(500).json({error : "Something went wrong"})
    }else{
        res.status(200).json({deleted : deletedOrder});
    }
})

// @route GET /orders/find/:userId
// @descp Create a new Order
// @access Private
exports.getUserOrders = asyncHandler(async(req , res , next)=>{
    const userId = req.params.userId;
    const orders = await Order.find({user : userId})
    if(!orders){
        res.status(500).json({error : "Something went wrong"})
    }else{
        res.status(200).json({orders : orders})
    }
})

// @route GET /orders/
// @descp Get all orders
// @access Private (Admin)
exports.getAllOrders = asyncHandler(async(req , res , next)=>{
    const orders = await Order.find()
    res.status(200).json({orders : orders});
})

exports.getMonthlyIncome = asyncHandler(async(req , res , next)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));  
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    const income = await Order.aggregate([
        {$match : {createdAt : {$gte : previousMonth}}},
        {$project : {month : {$month : "$createdAt"} , sales : "$amount"}},
        {$group : {_id : "$month", total : {$sum : "$sales"}}}
    ])
    res.status(200).json(income);
})

