const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");
const organizationMemberMiddleware = require("@/utils/middleware/organization/organizationMemberMiddleware");
const getAllPermissionController = require("../../../controllers/organization/permission/getAllPermission.controller");
const getPermissionByUserController = require("../../../controllers/organization/permission/getPermissionByUser.controller");
const getPermissionController = require("../../../controllers/organization/permission/getPermission.controller");
const createPermissionController = require("../../../controllers/organization/permission/createPermission.controller");
const updatePermissionController = require("../../../controllers/organization/permission/updatePermission.controller");
const getPermissionAssignedMemberController = require("../../../controllers/organization/permission/getPermissionAssignedMember.controller");
const deletePermissionController = require("../../../controllers/organization/permission/deletePermissionName.controller")
const UpdatePermissionNameController = require("../../../controllers/organization/permission/updatePermissionName.controller")
const router = express.Router();
const key = "roles-and-permissions";
const plan = "admin_settings";

router.get(
    "/permissions",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    getAllPermissionController
);

router.get(
    "/permission/user",
    Middleware,
    organizationMemberMiddleware,
    getPermissionByUserController
);

router.get(
    "/permission/:id",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    getPermissionController
);

router.get(
    "/permission/members/:id",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    getPermissionAssignedMemberController
);

router.post(
    "/permission/add",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    createPermissionController
);

router.patch(
    "/permission/update",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "update", plan),
    updatePermissionController
);
router.delete(
    "/permission/delete",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "update", plan),
    deletePermissionController
);
router.patch(
    "/permission/name/update",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "update", plan),
    UpdatePermissionNameController
);
module.exports = router;