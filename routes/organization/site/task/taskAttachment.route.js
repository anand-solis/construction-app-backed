const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const taskMiddleware = require("@/utils/middleware/organization/taskMiddleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");

const GetAllTaskAttachmentController = require("../../../../controllers/organization/site/task/attachment/getAllTaskAttachment.controller");
const AddTaskAttachmentController = require("../../../../controllers/organization/site/task/attachment/addTaskAttachment.controller");
const RemoveTaskAttachmentController = require("../../../../controllers/organization/site/task/attachment/removeTaskAttachment.controller");

const router = express.Router();

const key = "tasks";
const plan = "project_management";

router.get(
    "/task/attachments",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    siteMiddleware,
    taskMiddleware,
    GetAllTaskAttachmentController
);

router.post(
    "/task/attachment/add",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    siteMiddleware,
    taskMiddleware,
    AddTaskAttachmentController
);

router.delete(
    "/task/attachment/remove/:id",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "delete", plan),
    siteMiddleware,
    taskMiddleware,
    RemoveTaskAttachmentController
);

module.exports = router;