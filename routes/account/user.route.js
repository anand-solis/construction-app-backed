const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const superAdminMiddleware = require("@/utils/middleware/superAdminMiddleware");
const GetAllUsersController = require("../../controllers/account/user/getAllUsers.controller");
const GetUsersCountController = require("../../controllers/account/user/getUsersCount.controller");
const UpdateUserController = require("../../controllers/account/user/updateUser.controller");

const router = express.Router();

router.get(
    "/users/count",
    Middleware,
    superAdminMiddleware,
    GetUsersCountController
);

router.get(
    "/users",
    Middleware,
    superAdminMiddleware,
    GetAllUsersController
);

router.patch(
    "/user/update/:id",
    Middleware,
    superAdminMiddleware,
    UpdateUserController
);

module.exports = router;