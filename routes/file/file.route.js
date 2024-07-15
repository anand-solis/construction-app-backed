const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");

const router = express.Router();

const key = "media-library";
const plan = "media_library";

module.exports = router;