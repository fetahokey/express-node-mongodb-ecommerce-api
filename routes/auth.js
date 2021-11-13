const router = require("express").Router();
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers
} = require("../controllers/auth");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../utils/verifyToken");
const { validateRegisterUser } = require("../validators/auth");

// register user
router.post("/", validateRegisterUser, registerUser);

// load user
router.get("/:id", verifyTokenAndAdmin, getUser);

// get all useres
router.get("/", verifyTokenAndAdmin, getUsers);


// update user
router.put("/:id", verifyTokenAndAuthorization, updateUser);

// delete user
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

// authenticate user
router.post("/login", loginUser);

module.exports = router;
