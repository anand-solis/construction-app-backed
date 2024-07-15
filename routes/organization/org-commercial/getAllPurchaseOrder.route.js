const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");
const GetAllPurchaseOrder = require("@/controllers/organization/org-commercial/getAllPurchaseOrder.controller");

const router = express.Router();
plan = "material_management";
key = "purchase-order";

router.get(
  "/allpurchaseOrder/get",
  Middleware,
  (req, res, next) =>
    organizationMiddleware(req, res, next, key, "insert", plan),
  GetAllPurchaseOrder
);

module.exports = router;

