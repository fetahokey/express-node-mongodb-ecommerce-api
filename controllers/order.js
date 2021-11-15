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
        res.status(500).json({error : "something went wrong"});
    }else{
        res.status(200).json({order : foundOrder})
    }
})

// @route PUT /orders/:id
// @descp Edit an order
// @access Private
exports.updateOrder = asyncHandler(async (req , res , next)=>{
    const orderId = req.params.id;
    updatedOrder = await Order.findByIdAndUpdate(orderId , req.body);
    if(!updatedOrder){
        res.status(500).json({error : "Something went wrong"})
    }else{
        res.status(200).json({order : updatedOrder})
    }
})

// @route DELETE /orders/:id
// @descp Delete an Order
// @access Private
exports.deleteOrder = asyncHandler(async (req , res , next)=>{
    const orderId = req.params.id;
    console.log(orderId)
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    console.log(deletedOrder)
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
    if(!orders){
        res.status(500).json({error : "Something went wrong"})
    }else{
        res.status(200).json({orders : orders})
    }
})

// exports.getMonthlyIncome = asyncHandler(async(req , res , next)=>{

// })