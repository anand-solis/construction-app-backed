const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const taskMiddleware = require("@/utils/middleware/organization/taskMiddleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");

const GetAllTaskIssueController = require("../../../../controllers/organization/site/task/issue/getAllTaskIssue.controller");
const AddTaskIssueController = require("../../../../controllers/organization/site/task/issue/addTaskIssue.controller");
const UpdateTaskIssueController = require("../../../../controllers/organization/site/task/issue/updateTaskIssue.controller");
const RemoveTaskIssueController = require("../../../../controllers/organization/site/task/issue/removeTaskIssue.controller");

const router = express.Router();

const key = "tasks";
const plan = "project_management";

router.get(
    "/task/issues",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    siteMiddleware,
    taskMiddleware,
    GetAllTaskIssueController
);

router.post(
    "/task/issue/add",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    siteMiddleware,
    taskMiddleware,
    AddTaskIssueController
);

router.patch(
    "/task/issue/update/:id",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "update", plan),
    siteMiddleware,
    taskMiddleware,
    UpdateTaskIssueController
);

router.delete(
    "/task/issue/remove/:id",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "delete", plan),
    siteMiddleware,
    taskMiddleware,
    RemoveTaskIssueController
);

module.exports = router;