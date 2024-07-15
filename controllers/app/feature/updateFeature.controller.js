const Feature = require("@/models/app/features.model");

const UpdateFeatureController = async (req, res) => {
    const { name, key, description } = req.body;
    const { id } = req.params;

    try {
        await Feature.findOneAndUpdate(
            { _id: id },
            {
                name: name,
                key: key,
                description: description
            }
        );

        return res.status(200).json({ success: true, error: "", message: "Feature updated successfully." });

    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = UpdateFeatureController;