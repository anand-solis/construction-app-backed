const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const superAdminMiddleware = require("@/utils/middleware/superAdminMiddleware");

const GetAllAssignFeaturesSubscriptionController = require("../../controllers/app/subscription/assign-features/getAllAssignFeaturesSubscription.controller");
const GetAssignFeaturesSubscriptionController = require("../../controllers/app/subscription/assign-features/getAssignFeaturesSubscription.controller");
const AddAssignFeaturesSubscriptionController = require("../../controllers/app/subscription/assign-features/addAssignFeaturesSubscription.controller");
const UpdateAssignFeaturesSubscriptionController = require("../../controllers/app/subscription/assign-features/updateAssignFeaturesSubscription.controller");
const RemoveAssignFeaturesSubscriptionController = require("../../controllers/app/subscription/assign-features/removeAssignFeaturesSubscription.controller");


const router = express.Router();

router.get(
    "/subscription/assign-features",
    Middleware,
    superAdminMiddleware,
    GetAllAssignFeaturesSubscriptionController
);

router.get(
    "/subscription/assign-features/:id",
    Middleware,
    superAdminMiddleware,
    GetAssignFeaturesSubscriptionController
);

router.post(
    "/subscription/assign-features/add",
    Middleware,
    superAdminMiddleware,
    AddAssignFeaturesSubscriptionController
);

router.patch(
    "/subscription/assign-features/update/:id",
    Middleware,
    superAdminMiddleware,
    UpdateAssignFeaturesSubscriptionController
);

router.delete(
    "/subscription/assign-features/remove/:id",
    Middleware,
    superAdminMiddleware,
    RemoveAssignFeaturesSubscriptionController
);

module.exports = router;