const Organization = require("@/models/organization/main/organization.model");

const deleteOrganizationController = async (req, res) => {
    const { organization } = req.query;

    try {
        const organizationDetails = await Organization.findByIdAndDelete(organization)
        if(!organizationDetails){
        return res.status(200).json({ success: false, error: "", message: "Organization not deleted" });

        }

        return res.status(200).json({ success: true, error: "", message: "Organization deleted successfully." });
    } catch (error) {
        return res.status(500).json({  success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = deleteOrganizationController;