const Floor = require("@/models/organization/site/main/floor.model");

const GetAllFloorController = async (req, res) => {
    const { organization, site } = req.query;

    try {
        const floors = await Floor.find({ site: site, organization: organization }).select("name number");
        
        return res.status(200).json({ floors: floors, success: true, error: "", message: "Floors fetched successfully." });
    } catch (error) {
        return res.status(500).json({ floors: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAllFloorController;