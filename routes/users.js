const express = require('express');
const router = express.Router();

const userController = require('../controllers/users_controller');

router.get('/profile', userController.profile);

router.get('/posts',userController.posts);

router.get('/sign-in',userController.signIn);

router.get('/sign-up',userController.signUp);

//post request route for sign up
router.post('/create',userController.create); 

//post request route for singin submits
router.post('/createSession',userController.createSession);

module.exports = router;