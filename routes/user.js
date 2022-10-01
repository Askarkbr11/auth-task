const express  = require("express");
const { registerUser, login } = require("../controller/user");
const router = express.Router();

router.post("/register",registerUser).post("/login",login)

module.exports = router;