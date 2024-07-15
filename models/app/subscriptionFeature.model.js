const mongoose = require("mongoose");

const SubscriptionFeatureSchema = mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    features: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Feature",
            required: true
        }
    ]
});

const SubscriptionFeature = mongoose.model("SubscriptionFeature", SubscriptionFeatureSchema);

module.exports = SubscriptionFeature;