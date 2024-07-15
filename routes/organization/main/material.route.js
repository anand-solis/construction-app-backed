const addMaterial = require("@/controllers/organization/material/addmaterial.controller");
const getAllmaterialdata = require("@/controllers/organization/material/getMaterial.controller");
const updateMaterial = require("@/controllers/organization/material/updateMaterial.controller");
const Middleware = require("@/utils/middleware/middleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");
const deleteMaterial = require('../../../controllers/organization/material/deleteMatarial.controller')
const express = require("express");
const router = express.Router();

const plan = "material_management";
const key = "material-issues";


router.post(
  "/material/add",
  Middleware,
  (req, res, next) =>
    organizationMiddleware(req, res, next, key, "insert", plan),
    addMaterial
);
router.get(
  "/materials",
  Middleware,
  (req, res, next) =>
    organizationMiddleware(req, res, next, key, "insert", plan),
    getAllmaterialdata
);
router.patch(
  "/material/update",
  Middleware,
  (req, res, next) =>
    organizationMiddleware(req, res, next, key, "insert", plan),
    updateMaterial
);

router.delete(
  "/material/delete",
  Middleware,
  (req, res, next) =>
    organizationMiddleware(req, res, next, key, "insert", plan),
  deleteMaterial
);

module.exports = router