const mongoose = require("mongoose");

const PurchaseOrderSettingSchema = mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    site: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Site",
      required: true,
    },
    prefix: {
      type: String,
      required: true,
      default: "PO-",
    },
    gst: {
      type: String,
    },
    tnc: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "PurchaseOrderSetting",
  PurchaseOrderSettingSchema
);
