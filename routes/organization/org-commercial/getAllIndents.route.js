const express = require('express');
const GetAllIndents = require("@/controllers/organization/org-commercial/getAllIndent.controller");
const Middleware = require('@/utils/middleware/middleware');
const organizationMiddleware = require('@/utils/middleware/organization/organizationMiddleware');
const checkBoxSelectIndents = require("@/controllers/organization/org-commercial/getCheckBoxSelectIndent.controller");
const getIndentMaterialsdetails = require("../../../controllers/organization/org-commercial/getMaterialsdetails.controller")
const router = express.Router()

plan= "material_management"
key = "indent" 

router.get(
    "/allindents/get",
    Middleware,
    (req, res, next) =>
      organizationMiddleware(req, res, next, key, "insert", plan),
      GetAllIndents
  );
  router.post(
    "/checkBoxSelectIndents",
    Middleware,
    (req, res, next) =>
      organizationMiddleware(req, res, next, key, "insert", plan),
    checkBoxSelectIndents
  );
  router.get(
    "/getIndentMaterialsdetails",
    Middleware,
    (req, res, next) =>
      organizationMiddleware(req, res, next, key, "insert", plan),
    getIndentMaterialsdetails
  );

  module.exports = router;