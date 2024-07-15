const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const superAdminMiddleware = require("@/utils/middleware/superAdminMiddleware");

const GetRoleController = require("../../controllers/app/role/getRole.controller");
const AddRoleController = require("../../controllers/app/role/addRole.controller");
const UpdateRoleController = require("../../controllers/app/role/updateRole.controller");
const RemoveRoleController = require("../../controllers/app/role/removeRole.controller");
const GetRolesCountController = require("../../controllers/app/role/getRolesCount.controller");

const router = express.Router();

router.get(
    "/roles/count",
    Middleware,
    superAdminMiddleware,
    GetRolesCountController
);

router.get(
    "/roles",
    Middleware,
    GetRoleController
);

router.post(
    "/role/add",
    Middleware,
    superAdminMiddleware,
    AddRoleController
);

router.patch(
    "/role/update/:id",
    Middleware,
    superAdminMiddleware,
    UpdateRoleController
);

router.delete(
    "/role/remove/:id",
    Middleware,
    superAdminMiddleware,
    RemoveRoleController
);

module.exports = router;