const express = require('express');
const cartController = require('../controller/cart_controllers');
const router = express.Router();

/*
GET for Get Data
POST for Posting Data
PATCH/PUT for Updates
DELETE for Remove
*/

//Create CartList 
router.post('/cart/create', cartController.createCart)

//View CartList
router.get('/orders/products/cart', cartController.createCart)

//Delete Cartlist
router.delete('/cart/delete', cartController.deleteCartlist)

//Update Cartlist
router.put('/cart/:Cart_ID', cartController.updateCartlist)

//View All
router.get('/cartList', cartController.cartList)

//SAMPLE
//http://localhost:4000/api/users
module.exports = router