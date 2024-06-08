const jwt = require("jsonwebtoken");
const User = require("../../database/models/user.model.js");
const ApiError = require("../utils/AppError");
// @desc middleware function by passing an array of allowed roles as an argument.
exports.Auth = (allowedRoles) => async (req, res, next) => {
  // 1- Check if the Authorization header is present
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError("Access denied. No token provided.", 401));
  }
  // 2- Extract the token
  const token = authHeader.split(" ")[1];
  if (!token) {
    return next(new ApiError("Access denied. No token provided.", 401));
  }
  // Verify the token
  const decoded = jwt.verify(token, "LOL");
  const user = await User.findById(decoded._id);
  if (!user) {
    return next(new ApiError("Invalid token. User not found.", 401));
  }
  if (!allowedRoles.includes(user.role)) {
    return next(new ApiError("Access denied. Yor are not allowed", 405));
  }
  req.user = user;
  next();
};
