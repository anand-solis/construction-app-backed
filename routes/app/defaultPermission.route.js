const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const superAdminMiddleware = require("@/utils/middleware/superAdminMiddleware");
const GetAllDefaultPermissionController = require("../../controllers/app/defaultPermission/getAllDefaultPermission.controller");
const GetDefaultPermissionController = require("../../controllers/app/defaultPermission/getDefaultPermission.controller");
const CreateDefaultPermissionController = require("../../controllers/app/defaultPermission/createDefaultPermission.controller");
const UpdateDefaultPermissionController = require("../../controllers/app/defaultPermission/updateDefaultPermission.controller");
const RemoveDefaultPermissionController = require("../../controllers/app/defaultPermission/removeDefaultPermission.controller");
const GetDefaultPermissionsCountController = require("../../controllers/app/defaultPermission/getDefaultPermissionsCount.controller");

const router = express.Router();

router.get(
    "/default-permissions/count",
    Middleware,
    superAdminMiddleware,
    GetDefaultPermissionsCountController
);

router.get(
    "/default-permissions",
    Middleware,
    superAdminMiddleware,
    GetAllDefaultPermissionController
);

router.get(
    "/default-permission/:id",
    Middleware,
    superAdminMiddleware,
    GetDefaultPermissionController
);

router.post(
    "/default-permission/add",
    Middleware,
    superAdminMiddleware,
    CreateDefaultPermissionController
);

router.patch(
    "/default-permission/update",
    Middleware,
    superAdminMiddleware,
    UpdateDefaultPermissionController
);

router.delete(
    "/default-permission/remove/:id",
    Middleware,
    superAdminMiddleware,
    RemoveDefaultPermissionController
);

module.exports = router;