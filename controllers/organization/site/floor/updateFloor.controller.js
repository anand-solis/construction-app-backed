const Floor = require("@/models/organization/site/main/floor.model");

const UpdateFloorController = async (req, res) => {
    const { name, number } = req.body;
    const { organization, site } = req.query;
    const { id } = req.params;

    try {
        await Floor.findOneAndUpdate(
            {
                _id: id,
                organization: organization,
                site: site
            },
            {
                name: name,
                number: number
            }
        );

        return res.status(200).json({ success: true, error: "", message: "Floors updated successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = UpdateFloorController;