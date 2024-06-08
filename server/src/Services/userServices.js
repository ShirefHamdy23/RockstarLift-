const User = require("../../database/models/user.model");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/AppError");
const BuyerList = require("../../database/models/BuyerList.model");
const {
  MarketingCampaign,
} = require("../../database/models/marketing.model.js");

const AddressRequest = require("../../database/models/propertyAddressRequest.model.js");
const propertyMessage = require("../../database/models/propertyMessage.model.js");
const propertyOffer = require("../../database/models/propertyOffer.model.js");
exports.registerUser = asyncHandler(async (req, res, next) => {
  const isExist = await User.findOne({ email: req.body.email });
  if (isExist) return next(new ApiError(`Email Already Exist`, 422));
  const user = new User(req.body);
  console.log(req.file, req.body);
  user.profilePic.data = req.file?.buffer;
  user.profilePic.contentType = "image/jpg";
  await user.save();

  res.status(201).send({ user });
});

exports.loginUser = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError(`Email not found`, 404));
  }
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return next(new ApiError(`Password incorrect`, 404));
  }
  user.status = "online";
  const token = await user.generateAuthToken();
  res.send({ user, token });
};
exports.logoutUser = asyncHandler(async (req, res, next) => {
  req.user.token = "";
  req.user.status = "offline";
  await req.user.save();
  res.json({
    success: true,
    message: "Logout successfully",
  });
});

exports.getUsers = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 50;
  const skip = (page - 1) * limit;
  const users = await User.find().limit(limit).skip(skip);

  res.status(200).json({
    result: users.length,
    page,
    data: users,
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  return res.json({ user });
});
exports.profileUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  return res.json({ profile: user });
});
exports.currentProfile = asyncHandler(async (req, res, next) => {
  return res.json({ profile: req.user });
});

exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;
  await BuyerList.deleteMany({ user: id });
  await MarketingCampaign.deleteMany({ user: id });
  await AddressRequest.deleteMany({ user: id });
  await propertyMessage.deleteMany({ sender: id });
  await propertyOffer.deleteMany({ buyer: id });
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  return res.json({ success: true, message: "Deleted successfully" });
};

exports.updateMyProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const updateData = req.body;
  console.log(req.file);
  const requestedUpdate = Object.keys(updateData);
  const allowedUpdate = ["firstName", "lastName", "email", "password"];
  const isValidOperation = requestedUpdate.every((update) =>
    allowedUpdate.includes(update)
  );
  // if (!isValidOperation) return next(new ApiError("Not supported update", 400));
  const user = await User.findById(userId);
  requestedUpdate.forEach((update) => (user[update] = updateData[update]));
  console.log(req.file);
  if (req.file) {
    user.profilePic.data = req.file?.buffer;
    user.profilePic.contentType = "image/jpg";
  }
  await user.save();
  res.status(200).json({
    success: true,
    message: "Your profile updated successfully",
    user,
  });
});

exports.updateUserProfile = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const updateData = req.body;
  const requestedUpdate = Object.keys(updateData);
  console.log(req.body);
  const allowedUpdate = [
    "firstName",
    "lastName",
    "email",
    "password",
    "role",
    "age",
    "phone",
  ];
  const isValidOperation = requestedUpdate.every((update) => {
    return allowedUpdate.includes(update);
  });
  if (!isValidOperation) return next(new ApiError("Not supported update", 400));
  const user = await User.findById(userId);
  requestedUpdate.forEach((update) => (user[update] = updateData[update]));
  if (req.file) {
    user.profilePic.data = req.file.buffer;
    user.profilePic.contentType = "image/jpg";
  }
  await user.save();
  res.status(200).json({
    success: true,
    message: "User profile updated successfully",
    user,
  });
});
exports.image = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.profilePic) throw new Error();
    res.set("Content-Type", "image/png");
    res.send(user.profilePic.data);
  } catch (e) {}
};

exports.createUser = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const user = new User(req.body);
  await user.save();
  res.status(201).send({ user });
});

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    result: users.length,
    data: users,
  });
});
