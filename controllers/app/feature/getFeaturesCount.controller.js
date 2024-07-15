const Feature = require("@/models/app/features.model");

const GetFeaturesCountController = async (req, res) => {
    try{
        const count = await Feature.find({}).count();

        return res.status(200).json({ count: count, success: true, error: "", message: "Features count fetched successfully." });
    } catch(error) {
        return res.status(500).json({ defaultPermission: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetFeaturesCountController;