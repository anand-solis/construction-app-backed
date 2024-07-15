const express = require("express");
const LoginController = require("../../controllers/account/login/login.controller");

const router = express.Router();

router.post("/login", LoginController);

module.exports = router;