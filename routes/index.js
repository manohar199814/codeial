const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
const users = require('./users');

console.log('router loaded');

router.get('/',homeController.home);

router.get('/cart',homeController.cart)

router.use('/user',users);

module.exports = router;