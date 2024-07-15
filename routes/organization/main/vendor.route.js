const express = require("express");
const router = express.Router();
const Middleware = require("@/utils/middleware/middleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");
const {
  addVendorDetails,
  addvendorFinancialDetails,
  addTermsandConditionDetails,
  uploadproof,
  deleteVendorDetails
} = require("@/controllers/organization/vendor/addVendor");
const {
  GetVendorByOrganization,getAllvendors
} = require("@/controllers/organization/vendor/getAllVendors");
const { updateVendorDetails, updatevendorFinacialDetails, updatetermsAndCondition } = require("@/controllers/organization/vendor/updateVendors.controller");


const key = "vendor";
const plan = "vendor_payable";

router.get(
  "/getAllvendors",
  Middleware,
  (req, res, next) =>
    organizationMiddleware(req, res, next, key, "read", plan),
    getAllvendors
);

router.post(
  "/vendor/adddetails",
  Middleware,
  (req, res, next) =>
    organizationMiddleware(req, res, next, key, "insert", plan),
  addVendorDetails
);
router.post(
  "/vendor/addfinancial",
  Middleware,
  (req, res, next) =>
    organizationMiddleware(req, res, next, key, "insert", plan),
  addvendorFinancialDetails
);
router.post(
  "/vendor/addtermsandcondition",
  Middleware,
  (req, res, next) =>
    organizationMiddleware(req, res, next, key, "insert", plan),
  addTermsandConditionDetails
);
router.post(
  "/vendor/uploadproof",
  Middleware,
  (req, res, next) =>
    organizationMiddleware(req, res, next, key, "insert", plan),
  uploadproof
);
router.get(
  "/vendor/getByOrganiztion",
  Middleware,
  (req, res, next) =>
  organizationMiddleware(req, res, next, key, "insert", plan),
  GetVendorByOrganization
);

router.patch(
  "/vendor/edit/personalDetails",
  Middleware,
  (req, res, next) =>
  organizationMiddleware(req, res, next, key, "insert", plan),
  updateVendorDetails
);
router.patch(
  "/vendor/edit/financialDetails",
  Middleware,
  (req, res, next) =>
  organizationMiddleware(req, res, next, key, "insert", plan),
  updatevendorFinacialDetails
);
router.patch(
  "/vendor/edit/termsAndCondition",
  Middleware,
  (req, res, next) =>
  organizationMiddleware(req, res, next, key, "insert", plan),
  updatetermsAndCondition
);
router.delete(
  "/vendor/deleteVendorDetails",
  Middleware,
  (req, res, next) =>
  organizationMiddleware(req, res, next, key, "insert", plan),
  deleteVendorDetails
);

module.exports = router;
