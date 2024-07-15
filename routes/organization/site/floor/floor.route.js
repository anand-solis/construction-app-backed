const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");

const GetAllFloorController = require("../../../../controllers/organization/site/floor/getAllFloor.controller");
const AddFloorController = require("../../../../controllers/organization/site/floor/addFloor.controller");
const UpdateFloorController = require("../../../../controllers/organization/site/floor/updateFloor.controller");
const deleteFloorController = require("../../../../controllers/organization/site/floor/deleteFloor.controller")

const router = express.Router();

const key = "sites";
const plan = "project_management";

router.get(
    "/floors",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    siteMiddleware,
    GetAllFloorController
);

router.post(
    "/floor/add",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    siteMiddleware,
    AddFloorController
);

router.patch(
    "/floor/update/:id",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "update", plan),
    siteMiddleware,
    UpdateFloorController
);
router.delete(
    "/floor/delete",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "update", plan),
    siteMiddleware,
    deleteFloorController
);

module.exports = router;