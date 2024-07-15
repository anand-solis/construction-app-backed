const Organization = require("@/models/organization/main/organization.model");

const UpdateAppOrganizationController = async (req, res) => {
    const { id } = req.params;
    const { blocked } = req.body;

    try {
        await Organization.findOneAndUpdate(
            { _id: id },
            { blocked: blocked }
        )

        return res.status(200).json({ success: true, error: "", message: `Organization ${blocked ? "blocked" : "unblocked"} successfully.` });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = UpdateAppOrganizationController;