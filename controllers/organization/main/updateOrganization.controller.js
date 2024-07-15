const Organization = require("@/models/organization/main/organization.model");
const File = require("@/models/file/file.model");
const uploadStorageFile = require("@/utils/connections/storage/uploadStorageFile");

const updateOrganizationController = async (req, res) => {
    const { organization } = req.query;

    try {
        const response = await uploadStorageFile(req, ["image"]);

        if (response.success) {
            const prev = await Organization.findOne({ _id: organization }).select("profile");

            if(prev?.profile){
                await File.findOneAndUpdate(
                    { organization: organization, _id: prev.profile },
                    { used: false }
                )
            }
            
            await Organization.findOneAndUpdate(
                {
                    _id: organization
                },
                {
                    profile: response.file
                }
            )
        }

        const updatedFields = {};

        if (response?.fields?.name?.[0] !== undefined) updatedFields.name = response.fields.name[0];
        if (response?.fields?.email?.[0] !== undefined) updatedFields.email = response.fields.email[0];
        if (response?.fields?.phone?.[0] !== undefined) updatedFields.phone = response.fields.phone[0];
        if (response?.fields?.address?.[0] !== undefined) updatedFields.address = response.fields.address[0];
        if (response?.fields?.city?.[0] !== undefined) updatedFields.city = response.fields.city[0];
        if (response?.fields?.state?.[0] !== undefined) updatedFields.state = response.fields.state[0];
        if (response?.fields?.pin_code?.[0] !== undefined) updatedFields.pin_code = response.fields.pin_code[0];
        if (response?.fields?.gst_number?.[0] !== undefined) updatedFields.gst_number = response.fields.gst_number[0];
        if (response?.fields?.pan_number?.[0] !== undefined) updatedFields.pan_number = response.fields.pan_number[0];
        if (response?.fields?.tan?.[0] !== undefined) updatedFields.tan = response.fields.tan[0];

        await Organization.findOneAndUpdate(
            {
                _id: organization
            },
            {
                $set: updatedFields
            }
        )

        return res.status(200).json({ success: true, error: "", message: "Organization details updated successfully." });

    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = updateOrganizationController;