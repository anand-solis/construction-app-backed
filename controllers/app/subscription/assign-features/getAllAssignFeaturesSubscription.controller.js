const SubscriptionFeature = require("@/models/app/subscriptionFeature.model");

const GetAllAssignFeaturesSubscriptionController = async (req, res) => {
    try {
        const subscriptionFeatures = await SubscriptionFeature
            .find({})
            .select("key, features")
            .populate({
                path: "features",
                select: "name"
            });

        return res.status(200).json({ subscriptionFeatures: subscriptionFeatures, success: true, error: "", message: "Assigned features fetched successfully." });
    } catch (error) {
        return res.status(500).json({ subscriptionFeatures: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAllAssignFeaturesSubscriptionController;