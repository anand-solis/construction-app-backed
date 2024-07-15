const Organization = require("@/models/organization/main/organization.model");

const GetAllAppOrganizationController = async (req, res) => {
    try {
        const organizations = await Organization.find({}).select("name email phone blocked createdAt updatedAt");

        return res.status(200).json({ organizations: organizations, success: true, error: "", message: "Organizations fetched successfully." });
    } catch (error) {
        return res.status(500).json({ organizations: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAllAppOrganizationController;