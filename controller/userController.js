const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateRandomNumber } = require("../Common/utils");
const User = require("../models/userModel");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");

module.exports.registerUser = async (req, res) => {
  try {
    const userId = "USER" + generateRandomNumber(6);
    console.log(req.body);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }
    const findOneUser = await User.findOne({ email: email });
    console.log(findOneUser);
    if (findOneUser) {
      return res.status(422).json({ error: "Email already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    console.log(hashPassword);
    const createUser = new User({
      userId,
      name,
      email,
      password: hashPassword,
    });
    const saveUser = await createUser.save();

    res.status(201).json({
      message: "User registered successfully",
      status: "success",
      data: saveUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }
    let findUser = await User.findOne({ email: email });
    if (!findUser) {
      return res.status(422).json({ error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      return res.status(422).json({ error: "Invalid credentials" });
    }
    const token = await jwt.sign({ _id: findUser._id }, process.env.JWT_SECRET);
    res.cookie("CratorTech", token, {
      expiresIn: "1d",
      httpOnly: true,
    });

    res.status(200).json({
      message: "User logged in successfully",
      status: "success",
      data: findUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.createPassport = () => {
  try {
    passport.use(
      new Strategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: "/api/v1/user/getGoogleUser",
        },
        async function (accessToken, refreshToken, profile, done) {
          console.log(profile);
          const findUser = await User.findOne({email:profile.email})
          if(!findUser){
          const createUser = await User.create({
            name:profile.displayName,
            email:profile.email,
            googleId:profile.id
          })
          return done (null,createUser)
          }else{
            return done(null, findUser);
          }
        }
      )
    );
    passport.serializeUser(function (user, done) {
      done(null, user);
    });
    passport.deserializeUser(function (user, done) {
      done(null, user);
    });
  } catch (error) {}
};
