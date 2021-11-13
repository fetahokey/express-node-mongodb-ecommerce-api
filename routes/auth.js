const router = require("express").Router();
const { registerUser, loginUser, updateUser } = require("../controllers/auth");
const { verifyTokenAndAuthorization } = require("../utils/verifyToken");
const { validateRegisterUser } = require("../validators/auth");

// register user
router.post("/", validateRegisterUser, registerUser);

// load user
//router.get("/", getUsers);

// update user
router.put("/:id", verifyTokenAndAuthorization, updateUser);

// authenticate user
router.post("/login", loginUser);

module.exports = router;
