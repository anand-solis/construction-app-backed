const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");
const organizationMemberMiddleware = require("@/utils/middleware/organization/organizationMemberMiddleware");

const getPlanController = require("../../../controllers/organization/plan/getPlan.controller");
const getPlanByUserController = require("../../../controllers/organization/plan/getPlanByUser.controller");

const router = express.Router();

const key = "organization-plans";
const plan = "admin_settings";

router.get(
    "/plan",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    getPlanController
);

router.get(
    "/plan/user",
    Middleware,
    organizationMemberMiddleware,
    getPlanByUserController
);

module.exports = router;