const express = require('express');
const orderController = require('../controller/order_controllers');
const router = express.Router();

/*
GET for Get Data
POST for Posting Data
PATCH/PUT for Updates
DELETE for Remove
*/
//View OrderList
router.get('/orders/view', orderController.orderList)

//Create OrderList
router.post('/orders/create', orderController.createOrder)

//View All
router.get('/orderList', orderController.orderList)

//SAMPLE
//http://localhost:4000/api/users
module.exports = router