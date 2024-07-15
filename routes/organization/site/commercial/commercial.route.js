const GetIndent = require("@/controllers/organization/site/commercial/getindent.controller");
const AddIndentController = require("@/controllers/organization/site/commercial/indent.controller");
const updateIndent = require("@/controllers/organization/site/commercial/updateindent.controller");
const Middleware = require("@/utils/middleware/middleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const express = require("express");

const router = express.Router();

 plan= "material_management"
 key = "indent"
router.post(
  "/indent/add",
  Middleware,
  (req, res, next) =>
    organizationMiddleware(req, res, next, key, "insert", plan),
  siteMiddleware,
  AddIndentController
);
router.get(
  "/indent/get",
  Middleware,
  (req, res, next) =>
    organizationMiddleware(req, res, next, key, "insert", plan),
  siteMiddleware,
  GetIndent
);
router.patch(
  "/indent/update/:id",
  Middleware,
  (req, res, next) =>
    organizationMiddleware(req, res, next, key, "insert", plan),
  siteMiddleware,
  updateIndent
);

module.exports = router;
