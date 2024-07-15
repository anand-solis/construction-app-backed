const { Types } = require("aws-sdk/clients/acm");
const mongoose = require("mongoose");

const GRNSchema = mongoose.Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Site",
        required: true,
    },
    poId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "purchaseorders",
        required: true,
    },
    GRNId: {
        type: String,
        required: true
    },
    material: [
        {
            itemDetails: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Material",
                required: [true, "Material Id is required."], // Replace 'OtherModel' with the actual name of the referenced model
            },
            receiveQuantity: {
                type: Number,
                required: true,
            },
            orderedQuantity: {
                type: Number,
                required: true,
            },
            receiveTime: {
                type: Date,
            },

        },
    ],
    invoice: {
        type: String
    },
    challan: {
        type: String
    },
    remark: {
        type: String
    },

}, { timestamps: true });

module.exports = mongoose.model("GRN", GRNSchema);