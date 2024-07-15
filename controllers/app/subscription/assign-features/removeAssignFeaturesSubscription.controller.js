const SubscriptionFeature = require("@/models/app/subscriptionFeature.model");

const RemoveAssignFeaturesSubscriptionController = async (req, res) => {
    const { id } = req.params;

    try {
        await SubscriptionFeature.deleteOne({ _id: id });
        return res.status(200).json({ success: true, error: "", message: "Assigned Feature removed successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = RemoveAssignFeaturesSubscriptionController;