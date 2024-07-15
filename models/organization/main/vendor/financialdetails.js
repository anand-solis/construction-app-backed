const mongoose = require("mongoose");

const FinancialSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Organization is required."],
    },
    gstTreatment: {
      type: String,
      required: [true, "GST Treatment is required."],
    },
    gstIn: {
      type: String,
    },
    pan: {
      type: String,
    },
    bankName: {
      type: String,
    },
    accountHolder: {
      type: String,
    },
    accountNumber: {
      type: Number,
    },
    IFSCcode: {
      type: String,
    },
  },
  {
    timestamps: true, // This option enables automatic management of createdAt and updatedAt fields
  }
);
module.exports = mongoose.model("VendorFinancial", FinancialSchema);
