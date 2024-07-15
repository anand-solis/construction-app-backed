const express = require('express');
const router = express.Router()
const Middleware = require('@/utils/middleware/middleware');
const {addMaterailIssue,deleteMaterialIssues,updateMaterailIssue,getMaterailIssues} = require("@/controllers/organization/material/materialIssue.controllers")
const organizationMiddleware = require('@/utils/middleware/organization/organizationMiddleware');


router.post(
    "/material/issue/add",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    addMaterailIssue
);
router.delete(
    "/material/issue/delete",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    deleteMaterialIssues
);
router.put(
    "/material/issue/update",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    updateMaterailIssue
);

router.get(
    "/material/issue/gets",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    getMaterailIssues
);

module.exports = router
