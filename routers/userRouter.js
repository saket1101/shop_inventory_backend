const express = require('express');
const {registerUser,loginUser} = require('../controller/userController');
const router = express.Router();
const {authGuard} = require('../middleware/middleware');
const passport = require('passport');


router.post("/register",registerUser)
router.post("/login",loginUser)

router.get('/getGoogleUser',passport.authenticate('google',{scope:['profile','email']}))

module.exports = router;