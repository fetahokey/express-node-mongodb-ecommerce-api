const router = require("express").Router();
const { registerUser, loginUser } = require("../controllers/auth");
const { validateRegisterUser } = require("../validators/auth");

// register user
router.post("/", validateRegisterUser, registerUser);

// load user
//router.get("/", getUsers);

// authenticate user
router.post("/login", loginUser);

module.exports = router;
