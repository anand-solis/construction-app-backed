const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const taskMiddleware = require("@/utils/middleware/organization/taskMiddleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");

const GetAllTaskTimelineController = require("../../../../controllers/organization/site/task/timeline/getAllTaskTimeline.controller");
const AddTaskTimelineController = require("../../../../controllers/organization/site/task/timeline/addTaskTimeline.controller");
const RemoveTaskTimelineController = require("../../../../controllers/organization/site/task/timeline/removeTaskTimeline.controller");

const router = express.Router();

const key = "tasks";
const plan = "project_management";

router.get(
    "/task/timelines",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    siteMiddleware,
    taskMiddleware,
    GetAllTaskTimelineController
);

router.post(
    "/task/timeline/add",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    siteMiddleware,
    taskMiddleware,
    AddTaskTimelineController
);

router.delete(
    "/task/timeline/remove/:id",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "delete", plan),
    siteMiddleware,
    taskMiddleware,
    RemoveTaskTimelineController
);

module.exports = router;