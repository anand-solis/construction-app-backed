const SubscriptionFeature = require("@/models/app/subscriptionFeature.model");

const GetAssignFeaturesSubscriptionController = async (req, res) => {
    const { id } = req.params;
    
    try {
        const subscriptionFeature = await SubscriptionFeature.findOne({ _id: id }).select("key, features");

        return res.status(200).json({ subscriptionFeature: subscriptionFeature, success: true, error: "", message: "Assigned feature fetched successfully." });
    } catch (error) {
        return res.status(500).json({ subscriptionFeature: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAssignFeaturesSubscriptionController;