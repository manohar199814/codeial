const express = require('express');
const router = express.Router();

const passport =require('passport');

const userController = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication, userController.profile);

router.post('/update/:id',passport.checkAuthentication, userController.update);

router.get('/posts',userController.posts);

router.get('/sign-in',passport.checkAuthenticationSignin,userController.signIn);

router.get('/sign-up',passport.checkAuthenticationSignin,userController.signUp);

router.get('/sign-out',userController.signOut);

//post request route for sign up
router.post('/create',userController.create); 

//post request route for singin submits
router.post('/create-Session', passport.authenticate('local', { failureRedirect: '/user/sign-in' }),userController.createSession);

module.exports = router;