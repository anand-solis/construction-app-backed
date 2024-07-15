const mongoose = require("mongoose");

const BoqSchema = mongoose.Schema({
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  materialName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Material",
    required: true,
  },
  description: {
    type: String,
  },
  ratio: {
    type: Number,
  },
  uom: {
    type: String,
    required: [true, "Unit Of Material UOM is required."],
  },
  quantity: {
    type: Number,
  },
  wattage: {
    type: Number,
  },
  cost: {
    type: Number,
  },
  consumption: {
    type: Number,
  },
  totalAmount: {
    type: Number,
    required: [true, "Total Amount is required."],
  },
});

module.exports = mongoose.model("BOQ", BoqSchema);
