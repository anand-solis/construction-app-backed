const AddPurchaseOrder = require("@/controllers/organization/site/commercial/addPO.controller");
const GetPurchaseOrder = require("@/controllers/organization/site/commercial/getPO.controller");
const Middleware = require("@/utils/middleware/middleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const updatePurchaseOrderProfile = require("@/controllers/organization/site/commercial/addPoProfile.controller");
const getUpcomingPurchaseOrder = require("@/controllers/organization/site/commercial/upcomingPurchageOrder.controller")
const express = require("express")
const router = express.Router();


plan= "material_management"
key = "purchase-order"

router.post(
 "/purchaseOrder/add",
 Middleware,
 (req, res, next) =>
   organizationMiddleware(req, res, next, key, "insert", plan),
 siteMiddleware,
 AddPurchaseOrder
);

router.get(
 "/purchaseOrder/get",
 Middleware,
 (req, res, next) =>
   organizationMiddleware(req, res, next, key, "insert", plan),
 siteMiddleware,
 GetPurchaseOrder
);
router.get(
  "/purchaseOrder/upcoming",
  Middleware,
  (req, res, next) =>
    organizationMiddleware(req, res, next, key, "insert", plan),
  // siteMiddleware,
  getUpcomingPurchaseOrder
 );
router.put(
  "/purchaseOrder/profile",
  Middleware,
  (req, res, next) =>
    organizationMiddleware(req, res, next, key, "insert", plan),
  siteMiddleware,
  updatePurchaseOrderProfile
 );

module.exports = router