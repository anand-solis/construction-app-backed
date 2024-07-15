const uploadStorageFile = require("@/utils/connections/storage/uploadStorageFile");
const File = require("@/models/file/file.model");
const Site = require("@/models/organization/site/main/site.model");

const UpdateSiteController = async (req, res) => {
    const { organization, site } = req.query;

    try {
        const response = await uploadStorageFile(req, ["image"]);

        if (response.success) {
            const prev = await Site.findOne({ _id: site, organization: organization }).select("profile");

            if (prev?.profile) {
                await File.findOneAndUpdate(
                    { organization: organization, _id: prev.profile },
                    { used: false }
                )
            }

            await Site.findOneAndUpdate(
                {
                    _id: site,
                    organization: organization
                },
                {
                    profile: response.file
                }
            )
        }

        const updatedFields = {};

        if (response?.fields?.name?.[0] !== undefined) updatedFields.name = response.fields.name[0];
        if (response?.fields?.startDate?.[0] !== undefined) updatedFields.startDate = response.fields.startDate[0];
        if (response?.fields?.endDate?.[0] !== undefined) updatedFields.endDate = response.fields.endDate[0];
        if (response?.fields?.sitePocId?.[0] !== undefined) updatedFields.sitePocId = response.fields.sitePocId[0];
        if (response?.fields?.siteOfficeId?.[0] !== undefined) updatedFields.siteOfficeId = response.fields.siteOfficeId[0];


        await Site.findOneAndUpdate(
            {
                _id: site,
                organization: organization
            },
            {
                $set: updatedFields
            }
        )

        return res.status(200).json({ success: true, error: "", message: "Site details updated successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = UpdateSiteController;