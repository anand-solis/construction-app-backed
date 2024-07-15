const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const superAdminMiddleware = require("@/utils/middleware/superAdminMiddleware");

const GetSubscriptionsCountController = require("../../controllers/app/subscription/main/getSubscriptionsCount.controller");
const GetSubscriptionsController = require("../../controllers/app/subscription/main/getSubscriptions.controller");
const GetAllSubscriptionsController = require("../../controllers/app/subscription/main/getAllSubscriptions.controller");
const AddSubscriptionController = require("../../controllers/app/subscription/main/addSubscription.controller");
const UpdateSubscriptionController = require("../../controllers/app/subscription/main/updateSubscription.controller");
const RemoveSubscriptionController = require("../../controllers/app/subscription/main/removeSubscription.controller");

const router = express.Router();

router.get(
    "/subscriptions/count",
    Middleware,
    superAdminMiddleware,
    GetSubscriptionsCountController
);

router.get(
    "/subscriptions",
    Middleware,
    superAdminMiddleware,
    GetAllSubscriptionsController
);

router.get(
    "/subscription/:id",
    Middleware,
    superAdminMiddleware,
    GetSubscriptionsController
);


router.post(
    "/subscription/add",
    Middleware,
    superAdminMiddleware,
    AddSubscriptionController
);

router.patch(
    "/subscription/update/:id",
    Middleware,
    superAdminMiddleware,
    UpdateSubscriptionController
);

router.delete(
    "/subscription/remove/:id",
    Middleware,
    superAdminMiddleware,
    RemoveSubscriptionController
);

module.exports = router;