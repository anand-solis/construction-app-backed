const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const taskMiddleware = require("@/utils/middleware/organization/taskMiddleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");

const GetAllTaskCommentController = require("../../../../controllers/organization/site/task/comment/getAllTaskComment.controller");
const AddTaskCommentController = require("../../../../controllers/organization/site/task/comment/addTaskComment.controller");
const UpdateTaskCommentController = require("../../../../controllers/organization/site/task/comment/updateTaskComment.controller");
const RemoveTaskCommentController = require("../../../../controllers/organization/site/task/comment/removeTaskComment.controller");

const router = express.Router();

const key = "tasks";
const plan = "project_management";

router.get(
    "/task/comments",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    siteMiddleware,
    taskMiddleware,
    GetAllTaskCommentController
);

router.post(
    "/task/comment/add",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    siteMiddleware,
    taskMiddleware,
    AddTaskCommentController
);

router.patch(
    "/task/comment/update/:id",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "update", plan),
    siteMiddleware,
    taskMiddleware,
    UpdateTaskCommentController
);

router.delete(
    "/task/comment/remove/:id",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "delete", plan),
    siteMiddleware,
    taskMiddleware,
    RemoveTaskCommentController
);

module.exports = router;