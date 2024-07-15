const Labour = require("@/models/organization/site/attendance/labour/labour.model");
const uploadStorageFile = require("@/utils/connections/storage/uploadStorageFile");

const AddLabourController = async (req, res) => {
    const { organization, site } = req.query;

    try {
        const response = await uploadStorageFile(req, ["image"]);

        const labour = await Labour.create({
            organization: organization,
            site: site,
            name: response?.fields?.name?.[0],
            number: response?.fields?.number?.[0],
            role: response?.fields?.role?.[0],
            dailyHours: response?.fields?.dailyHours?.[0],
            payment: response?.fields?.payment?.[0],
            skills: response?.fields?.skills?.[0],
            gender: response?.fields?.gender?.[0]
        })

        if (labour?._id) {
            if (response.success) {
                await Labour.findOneAndUpdate(
                    {
                        _id: labour?._id,
                        organization: organization,
                        site: site
                    },
                    {
                        profile: response.file
                    }
                )
            }

            return res.status(200).json({ success: true, error: "", message: "Labour details added successfully." });
        }
        else {
            return res.status(200).json({ success: false, error: "Labour details not added.", message: "" });
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = AddLabourController;