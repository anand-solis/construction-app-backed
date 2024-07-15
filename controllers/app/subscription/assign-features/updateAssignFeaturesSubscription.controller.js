const SubscriptionFeature = require("@/models/app/subscriptionFeature.model");

const UpdateAssignFeaturesSubscriptionController = async (req, res) => {
    const { key, features } = req.body;
    const { id } = req.body;

    try {
        await SubscriptionFeature.findOneAndUpdate(
            { _id: id },
            { key: key, features: features }
        );

        return res.status(200).json({ success: true, error: "", message: "Assigned features updated successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = UpdateAssignFeaturesSubscriptionController;