const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const taskMiddleware = require("@/utils/middleware/organization/taskMiddleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");

const GetAllAddedTaskMemberController = require("../../../../controllers/organization/site/task/member/getAllAddedTaskMember.controller");
const GetAllNotAddedTaskMemberController = require("../../../../controllers/organization/site/task/member/getAllNotAddedTaskMember.controller");
const AddTaskMemberController = require("../../../../controllers/organization/site/task/member/addTaskMember.controller");

const router = express.Router();

const key = "task-members";
const plan = "project_management";

router.get(
    "/task/members",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, "tasks", "read", plan),
    siteMiddleware,
    taskMiddleware,
    GetAllAddedTaskMemberController
);

router.get(
    "/task/not-members",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    siteMiddleware,
    taskMiddleware,
    GetAllNotAddedTaskMemberController
);

router.post(
    "/task/member/add",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    siteMiddleware,
    taskMiddleware,
    AddTaskMemberController
);

module.exports = router;