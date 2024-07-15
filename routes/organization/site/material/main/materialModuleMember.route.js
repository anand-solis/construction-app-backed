const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");

const router = express.Router();

const GetAllMaterialModuleMemberController = require("../../../../../controllers/organization/site/material/member/getAllMaterialModuleMember.controller");
const GetAllNotMaterialModuleMemberController = require("../../../../../controllers/organization/site/material/member/getAllNotMaterialModuleMember.controller");
const AddMaterialModuleMemberController = require("../../../../../controllers/organization/site/material/member/addMaterialModuleMember.controller");

const key = "material-module-members";
const plan = "material_management";

router.get(
    "/material/members/:type",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    siteMiddleware,
    GetAllMaterialModuleMemberController
);

router.get(
    "/material/not-members/:type",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    siteMiddleware,
    GetAllNotMaterialModuleMemberController
);

router.post(
    "/material/member/add",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    siteMiddleware,
    AddMaterialModuleMemberController
);

module.exports = router;