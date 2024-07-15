const Organization = require("@/models/organization/main/organization.model");

const GetAppOrganizationCountController = async (req, res) => {
    try{
        const count = await Organization.find({}).count();

        return res.status(200).json({ count: count, success: true, error: "", message: "Organizations count fetched successfully." });
    } catch(error) {
        return res.status(500).json({ defaultPermission: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAppOrganizationCountController;