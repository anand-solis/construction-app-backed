const express = require("express");
const OTPController = require("../../controllers/account/otp/otp.controller");

const router = express.Router();

router.post("/send-otp", OTPController);

module.exports = router;