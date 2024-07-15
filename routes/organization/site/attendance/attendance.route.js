const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");

const router = express.Router();

const GetAttendanceController = require("../../../../controllers/organization/site/attendance/main/getAttendance.controller");
const MarkAttendanceController = require("../../../../controllers/organization/site/attendance/main/markAttendance.controller");

const key = "attendance";
const plan = "labour_tracking_and_payable";

router.get(
    "/attendance/:date",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    siteMiddleware,
    GetAttendanceController
);

router.patch(
    "/attendance/mark",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    siteMiddleware,
    MarkAttendanceController
);


module.exports = router;