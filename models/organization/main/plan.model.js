const mongoose = require("mongoose");

const PlanSchema = mongoose.Schema({
    subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription",
        required: true
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    },
    expiry: {
        type: Date,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Plan", PlanSchema);