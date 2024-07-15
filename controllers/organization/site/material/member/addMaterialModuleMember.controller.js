const MaterialModuleMember = require("@/models/organization/site/material/main/materialModuleMember.model");
const SiteMember = require("@/models/organization/site/main/siteMember.model");

const AddMaterialModuleMemberController = async (req, res) => {
    const { organization, site } = req.query;
    const { members, type } = req.body;

    const allowedTypes = [
        "indent-creator",
        "indent-approver",
        "purchase-order-creator",
        "purchase-order-approver",
        "material-issue-creator",
        "material-issue-approver"
    ]

    try {
        if (allowedTypes.includes(type)) {
            if (members) {
                await Promise.all(members.map(async (member) => {
                    try {
                        const siteMember = await SiteMember
                            .findOne({ _id: member._id, organization: organization, site: site })
                            .select("_id");

                        if (siteMember?._id) {
                            const check = await MaterialModuleMember
                                .findOne({
                                    organization: organization,
                                    site: site,
                                    member: member._id,
                                    type: type
                                })
                                .select("_id");

                            if (!check?._id) {
                                await MaterialModuleMember.create({
                                    organization: organization,
                                    site: site,
                                    member: member._id,
                                    type: type
                                });
                            }
                        }
                    } catch (error) {
                        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
                    }
                }));

                return res.status(201).json({ success: true, error: "", message: "All members added successfully.." });
            } else {
                return res.status(409).json({ success: false, error: "No members provided in your given list.", message: "" });
            }
        }
        else {
            return res.status(200).json({ success: false, error: "Error: This type is not allowed.", message: "" });
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = AddMaterialModuleMemberController;