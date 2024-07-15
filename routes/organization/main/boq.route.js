const { AddBOQ, GetBOQ, UpdateBOQ } = require("@/controllers/organization/boq/BOQ.controller");
const Middleware = require("@/utils/middleware/middleware");
const organizationMemberMiddleware = require("@/utils/middleware/organization/organizationMemberMiddleware");
const express = require("express");

const router = express.Router();

router.post(
  "/boq/add",
  Middleware,
  (req, res, next) => organizationMemberMiddleware(req, res, next, true),
  AddBOQ
);
router.get(
  "/boq/get",
  Middleware,
  (req, res, next) => organizationMemberMiddleware(req, res, next, true),
  GetBOQ
);
router.patch(
  "/boq/update/:id",
  Middleware,
  (req, res, next) => organizationMemberMiddleware(req, res, next, true),
  UpdateBOQ
);

module.exports = router;
