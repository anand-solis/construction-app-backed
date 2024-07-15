const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");

const GetAllSiteUploadController = require("../../../../controllers/organization/site/upload/getAllSiteUpload.controller");
const AddSiteUploadController = require("../../../../controllers/organization/site/upload/addSiteUpload.controller");
const RemoveSiteUploadController = require("../../../../controllers/organization/site/upload/removeSiteUpload.controller");

const router = express.Router();

const key = "sites";
const plan = "project_management";

router.get(
    "/site/uploads",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    siteMiddleware,
    GetAllSiteUploadController
);

router.post(
    "/site/upload/add",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    siteMiddleware,
    AddSiteUploadController
);

router.delete(
    "/site/upload/remove/:id",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "delete", plan),
    siteMiddleware,
    RemoveSiteUploadController
);

module.exports = router;