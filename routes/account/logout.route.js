const express = require("express");
const LogoutController = require("../../controllers/account/logout/logout.controller");
const Middleware = require("@/utils/middleware/middleware");

const router = express.Router();

router.get("/logout", Middleware, LogoutController);

module.exports = router;