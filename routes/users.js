const router = require("express").Router();
const { getUsers } = require("../controllers/user");

router.get("/", getUsers);
module.exports = router;
