const Feature = require("@/models/app/features.model");

const GetFeatureController = async (req, res) => {
    try {
        const features = await Feature.find({}).select("name key description").sort({ createdAt: -1 });

        return res.status(200).json({ features: features, success: true, error: "", message: "Feature fetched successfully." });
    } catch (error) {
        return res.status(500).json({ features: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetFeatureController;