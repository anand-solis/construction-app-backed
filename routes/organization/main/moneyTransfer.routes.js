const express = require("express");
const router = express.Router();
const key = "members";
const plan = "admin_settings";
const Middleware = require("@/utils/middleware/middleware");

const organizationMemberMiddleware = require("@/utils/middleware/organization/organizationMemberMiddleware");

const {createMoneyTranferOrder,getMoneyTranferOrder,deleteMoneyTranferOrder} = require('../../../controllers/organization/moneyTransfer.controllers')

router.post(
    "/moneyTranfer/create",
    Middleware,
    (req, res, next) => organizationMemberMiddleware(req, res, next, true),
    createMoneyTranferOrder
);

router.get(
    "/moneyTranfer/get",
    Middleware,
    (req, res, next) => organizationMemberMiddleware(req, res, next, true),
    getMoneyTranferOrder
);

router.delete(
    "/moneyTranfer/delete",
    Middleware,
    (req, res, next) => organizationMemberMiddleware(req, res, next, true),
    deleteMoneyTranferOrder
);
module.exports = router;
