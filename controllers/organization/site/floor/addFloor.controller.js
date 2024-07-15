const Floor = require("@/models/organization/site/main/floor.model");

const AddFloorController = async (req, res) => {
    const { organization, site } = req.query;
    const { name, number } = req.body;

    try {
        await Floor.create({
            site: site,
            organization: organization,
            name: name,
            number: number,
            createdBy: req.user._id
        });
        
        return res.status(201).json({ success: true, error: "", message: "Floors added successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = AddFloorController;