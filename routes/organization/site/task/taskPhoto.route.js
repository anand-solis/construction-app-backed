const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const taskMiddleware = require("@/utils/middleware/organization/taskMiddleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");

const GetAllTaskPhotoController = require("../../../../controllers/organization/site/task/photo/getAllTaskPhoto.controller");
const AddTaskPhotoController = require("../../../../controllers/organization/site/task/photo/addTaskPhoto.controller");
const RemoveTaskPhotoController = require("../../../../controllers/organization/site/task/photo/removeTaskPhoto.controller");

const router = express.Router();

const key = "tasks";
const plan = "project_management";

router.get(
    "/task/photos",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    siteMiddleware,
    taskMiddleware,
    GetAllTaskPhotoController
);

router.post(
    "/task/photo/add",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    siteMiddleware,
    taskMiddleware,
    AddTaskPhotoController
);

router.delete(
    "/task/photo/remove/:id",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "delete", plan),
    siteMiddleware,
    taskMiddleware,
    RemoveTaskPhotoController
);

module.exports = router;