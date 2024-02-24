const express = require('express');
const {registerUser,loginUser, logoutUser} = require('../controller/userController');
const router = express.Router();
const {authGuard} = require('../middleware/middleware');
const passport = require('passport');


router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/logout",authGuard,logoutUser)

// router.get('/getGoogleUser',passport.authenticate('google',{scope:['profile','email']}))

module.exports = router;