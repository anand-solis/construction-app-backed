const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");

const router = express.Router();

const GetPurchaseOrderSettingController = require("../../../../../controllers/organization/site/material/purchase-order/getPurchaseOrderSetting.controller");
const UpdatePurchaseOrderSettingController = require("../../../../../controllers/organization/site/material/purchase-order/updatePurchaseOrderSetting.controller");

const key = "purchase-order";
const plan = "material_management";

router.get(
    "/purchase-order/settings",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    siteMiddleware,
    GetPurchaseOrderSettingController
);

router.patch(
    "/purchase-order/setting/update",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "update", plan),
    siteMiddleware,
    UpdatePurchaseOrderSettingController
);

module.exports = router;