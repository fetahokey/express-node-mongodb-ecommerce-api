const router = require("express").Router();
const { registerUser } = require("../controllers/auth");
const { validateRegisterUser } = require("../validators/auth");

// register user
router.post("/", validateRegisterUser, registerUser);

//router.get("/", getUsers);

// authenticate user

module.exports = router;
