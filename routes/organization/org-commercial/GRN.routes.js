const express = require('express');
const { addGRNControllers,
  deliveryItemController,
  getAllGRN,
  deleteGRNController,
  updateGRNController

} = require("@/controllers/organization/org-commercial/GRN.controllers");
const Middleware = require('@/utils/middleware/middleware');
const organizationMiddleware = require('@/utils/middleware/organization/organizationMiddleware');

const router = express.Router()

plan = "material_management"
key = "purchase-order"

router.post(
  "/GRN/add",
  Middleware,
  (req, res, next) =>
    organizationMiddleware(req, res, next, key, "insert", plan),
  addGRNControllers
);

router.get(
  "/GRN/deliveryItems",
  Middleware,
  (req, res, next) =>
    organizationMiddleware(req, res, next, key, "insert", plan),
  deliveryItemController
);
router.delete(
  "/GRN/delete",
  Middleware,
  (req, res, next) =>
    organizationMiddleware(req, res, next, key, "insert", plan),
  deleteGRNController
);
router.get(
  "/GRN/getAllGRN",
  Middleware,
  (req, res, next) =>
    organizationMiddleware(req, res, next, key, "insert", plan),
  getAllGRN
);
router.put(
  "/GRN/update",
  Middleware,
  (req, res, next) =>
    organizationMiddleware(req, res, next, key, "insert", plan),
  updateGRNController
);


module.exports = router;