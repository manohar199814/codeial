const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
const users = require('./users');
const posts = require('./posts');

console.log('router loaded');

router.get('/',homeController.home);

router.use('/posts',posts);

router.get('/cart',homeController.cart);

router.use('/user',users);

module.exports = router;