const product = require('./products.route');
const user = require('./users.route');
const shoppingCart =  require('./shoppingcart.route');
const login = require("./login.route")
const express = require('express');


const router = express.Router();
router.use('/products', product);
router.use('/users', user);
router.use('/shoppingcart', shoppingCart);
router.use('/login', login)

module.exports = router;