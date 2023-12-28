const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports.authGuard = async (req, res, next) => {
  try {
    const token = req.cookies.CraTorTech;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.User = await User.findById(decoded._id);
    if (!req.User) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
