const express = require("express");
const {
  registerUser,
  loginUser,
  image,
  logoutUser,
  getUsers,
  getUser,
  currentProfile,
  deleteUser,
  updateMyProfile,
  updateUserProfile,
  createUser,
  getAllUsers,
} = require("../Services/userServices");
const upload = require("../Services/File_uploads");
const { Auth } = require("../middleware/Authentication");
const router = express.Router();

const Roles = ["Investor", "Buyer", "Retail", "Admin"];
const Investor = Roles[0];
const Buyer = Roles[1];
const Retail = Roles[2];
const Admin = Roles[3];
// Register - Login - Logout
router.route("/auth/login").post(loginUser);
router.route("/auth/register").post(upload.single("profilePic"), registerUser);
router.route("/auth/logout").post(Auth(Roles), logoutUser);
router
  .route("/me/update")
  .put(Auth(Roles), upload.single("profilePic"), updateMyProfile);

router.get("/getAllUsers", Auth("Admin"), getAllUsers);

// Users - specific User - Current User
router.route("/profile/me").get(Auth(Roles), currentProfile);

router.route("/").get(Auth(["Admin"]), getUsers);
router.route("/:id").get(getUser);

router.route("/delete/:id").delete(Auth(["Admin"]), deleteUser);
router
  .route("/update/:id")
  .put(Auth(["Admin"]), upload.single("profilePic"), updateUserProfile);

router.get("/image/:id", image);
router.post(
  "/createUser",
  upload.single("profilePic"),
  Auth("Admin"),
  createUser
);

module.exports = router;
