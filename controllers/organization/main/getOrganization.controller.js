const Organization = require("@/models/organization/main/organization.model");
const getStorageFile = require("@/utils/connections/storage/getStorageFile");

const getOrganizationController = async (req, res) => {
    const { organization } = req.query;

    try {
        const organizationDetails = await Organization
            .findOne({ _id: organization })
            .select("-blocked -createdAt -updatedAt -__v")
            .populate("profile", { url: 1, _id: 0 });

            if (organizationDetails && organizationDetails.profile) {
                const profile = await getStorageFile(organizationDetails.profile.url);
                organizationDetails.profile.url = profile.file;
            }
        // const profile = await getStorageFile(organizationDetails.profile.url);
        // organizationDetails.profile.url = profile.file;

        return res.status(200).json({ organizationDetails: organizationDetails, success: true, error: "", message: "Organization details fetched successfully." });
    } catch (error) {
        return res.status(500).json({ organizationDetails: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = getOrganizationController;