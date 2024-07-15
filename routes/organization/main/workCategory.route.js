const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const superAdminMiddleware = require("@/utils/middleware/superAdminMiddleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");

const GetAllWorkCategoriesController = require("../../../controllers/organization/workCategory/main/getAllWorkCategories.controller");
const GetAllAppWorkCategoriesController = require("../../../controllers/organization/workCategory/app/getAllAppWorkCategories.controller");
const AddWorkCategoryController = require("../../../controllers/organization/workCategory/main/addWorkCategory.controller");
const AddAppWorkCategoryController = require("../../../controllers/organization/workCategory/app/addAppWorkCategory.controller");

const UpdateAppWorkCategoryController = require("../../../controllers/organization/workCategory/app/updateAppWorkCategory.controller");
const RemoveAppWorkCategoryController = require("../../../controllers/organization/workCategory/app/removeAppWorkCategory.controller");

const router = express.Router();

const key = "organization-profile";
const plan = "admin_settings";

router.get(
    "/work-categories",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    GetAllWorkCategoriesController
);

router.get(
    "/app/work-categories",
    Middleware,
    superAdminMiddleware,
    GetAllAppWorkCategoriesController
);

router.post(
    "/work-category/add",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    AddWorkCategoryController
);

router.post(
    "/app/work-category/add",
    Middleware,
    superAdminMiddleware,
    AddAppWorkCategoryController
);

router.patch(
    "/work-category/update/:id",
    Middleware,
    // superAdminMiddleware,
    UpdateAppWorkCategoryController
);

router.delete(
    "/work-category/remove/:id",
    Middleware,
    // superAdminMiddleware,
    RemoveAppWorkCategoryController
);

module.exports = router;