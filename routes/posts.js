const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy')
const posts_controller = require('../controllers/posts_controller');

router.post('/create',passport.checkAuthentication,posts_controller.create);

module.exports = router;