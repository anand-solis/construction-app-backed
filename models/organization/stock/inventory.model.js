const mongoose = require("mongoose");
const Schema = mongoose.Schema

const InventorySchema = new Schema({
    organization: {
        type: Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    materialId: {
        type: String,
    },
    materialName: {
        type: String,
        required: [true, "Material Name is required."]
    },
    brandName: {
        type: String,
    },
    UOM: {
        type: String,
        required: [true, "UOM is required."]

    },
    GST: {
        type: Number,
    },
    HSN: {
        type: String,
    },
    inStocks: {
        type: Number,
    },
    usedFromStocks: {
        type: Number,
    },
    unitCost: {
        type: Number,
    },
    discription: {
        type: String,
    },
  
}, { timestamps: true });

module.exports = mongoose.model("Inventory", InventorySchema);