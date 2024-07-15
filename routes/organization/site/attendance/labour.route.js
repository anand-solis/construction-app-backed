const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");

const router = express.Router();

const GetAllLabourController = require("../../../../controllers/organization/site/attendance/labour/getAllLabour.controller");
const GetLabourController = require("../../../../controllers/organization/site/attendance/labour/getLabour.controller");
const AddLabourController = require("../../../../controllers/organization/site/attendance/labour/addLabour.controller");
const UpdateLabourController = require("../../../../controllers/organization/site/attendance/labour/updateLabour.controller");
const DeleteLabourController = require("@/controllers/organization/site/attendance/labour/deleteLabour.controller");

const key = "attendance";
const plan = "labour_tracking_and_payable";

router.get(
    "/labours",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    siteMiddleware,
    GetAllLabourController
);

router.get(
    "/labour/:id",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    siteMiddleware,
    GetLabourController
);

router.post(
    "/labour/add",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    siteMiddleware,
    AddLabourController
);

router.patch(
    "/labour/update/:id",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "update", plan),
    siteMiddleware,
    UpdateLabourController
);
router.delete(
    "/labour/delete/:id",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "delete", plan),
    siteMiddleware,
    DeleteLabourController
);

module.exports = router;