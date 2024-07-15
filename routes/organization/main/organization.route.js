const express = require("express");
const OrganizationController = require("../../../controllers/organization/main/organization.controller");
const getOrganizationSwitchController = require("../../../controllers/organization/main/getOrganizationSwitch.controller");
const getOrganizationController = require("../../../controllers/organization/main/getOrganization.controller");
const updateOrganizationController = require("../../../controllers/organization/main/updateOrganization.controller");

const getAllAppOrganizationController = require("../../../controllers/organization/app/getAllAppOrganization.controller");
const updateAppOrganizationController = require("../../../controllers/organization/app/updateAppOrganization.controller");
const GetAppOrganizationCountController = require("../../../controllers/organization/app/getAppOrganizationCount.controller");

const Middleware = require("@/utils/middleware/middleware");
const superAdminMiddleware = require("@/utils/middleware/superAdminMiddleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");
const deleteOrganizationController = require("../../../controllers/organization/main/deleteOrganization.controller")

const router = express.Router();

const key = "organization-profile";
const plan = "admin_settings";

router.get(
    "/app/organizations/count",
    Middleware,
    superAdminMiddleware,
    GetAppOrganizationCountController
);

router.get(
    "/app/organizations",
    Middleware,
    superAdminMiddleware,
    getAllAppOrganizationController
);

router.patch(
    "/app/organization/update/:id",
    Middleware,
    superAdminMiddleware,
    updateAppOrganizationController
);

router.get(
    "/organization/get",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    getOrganizationController
);

router.patch(
    "/organization/update",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "update", plan),
    updateOrganizationController
);

router.get(
    "/organization/switch",
    Middleware,
    getOrganizationSwitchController
);
router.delete(
    "/organization/delete",
    Middleware,
    deleteOrganizationController
);

router.post("/organization/add", Middleware, OrganizationController);

module.exports = router;