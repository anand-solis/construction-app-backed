const SubscriptionFeature = require("@/models/app/subscriptionFeature.model");

const AddAssignFeaturesSubscriptionController = async (req, res) => {
    const { key, features } = req.body;

    try {
        await SubscriptionFeature.create({
            key: key,
            features: features
        });

        return res.status(201).json({ success: true, error: "", message: "New Assigned features added successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = AddAssignFeaturesSubscriptionController;