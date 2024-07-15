const express = require("express");
const router = express.Router();
const inventoryController = require("../../controllers/stock/inventory.controller")
const Middleware = require("../../utils/middleware/middleware")
const organizationMiddleware = require("../../utils/middleware/organization/organizationMiddleware")
plan= "material_management"
key = "indent" 
router.post("/inventory/add",Middleware,(req, res, next) =>
    organizationMiddleware(req, res, next, key, "insert", plan),inventoryController.addInventory)

router.get("/inventory/getAll",Middleware,(req, res, next) =>
    organizationMiddleware(req, res, next, key, "insert", plan),inventoryController.getAllInventory)



module.exports = router;