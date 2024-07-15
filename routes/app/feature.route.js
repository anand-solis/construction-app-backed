const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const superAdminMiddleware = require("@/utils/middleware/superAdminMiddleware");

const GetFeatureController = require("../../controllers/app/feature/getFeature.controller");
const AddFeatureController = require("../../controllers/app/feature/addFeature.controller");
const RemoveFeatureController = require("../../controllers/app/feature/removeFeature.controller");
const UpdateFeatureController = require("../../controllers/app/feature/updateFeature.controller");
const GetFeaturesCountController = require("../../controllers/app/feature/getFeaturesCount.controller");

const router = express.Router();

router.get(
    "/features/count",
    Middleware,
    superAdminMiddleware,
    GetFeaturesCountController
);

router.get(
    "/features",
    Middleware,
    superAdminMiddleware,
    GetFeatureController
);

router.post(
    "/feature/add",
    Middleware,
    superAdminMiddleware,
    AddFeatureController
);

router.patch(
    "/feature/update/:id",
    Middleware,
    superAdminMiddleware,
    UpdateFeatureController
);

router.delete(
    "/feature/remove/:id",
    Middleware,
    superAdminMiddleware,
    RemoveFeatureController
);

module.exports = router;