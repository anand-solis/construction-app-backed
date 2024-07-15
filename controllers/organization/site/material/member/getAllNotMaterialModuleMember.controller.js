const MaterialModuleMember = require("@/models/organization/site/material/main/materialModuleMember.model");
const SiteMember = require("@/models/organization/site/main/siteMember.model");

const GetAllNotMaterialModuleMemberController = async (req, res) => {
    const { organization, site } = req.query;
    const { type } = req.params;

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
            const siteMembers = await SiteMember
                .find({ organization: organization, site, site })
                .select("member")
                .populate({
                    path: "member",
                    select: "user",
                    populate: {
                        path: "user",
                        select: ["name", "phone.number", "email.address"]
                    }
                });

            const materialModuleMembers = await MaterialModuleMember
                .find({ organization: organization, site: site, type: type })
                .select("member");

            const materialModuleMembersIds = materialModuleMembers.map(materialModuleMember => materialModuleMember.member.toString());

            const notMaterialModuleMembers = siteMembers.filter(member => !materialModuleMembersIds.includes(member._id.toString()));

            let result = [];
            notMaterialModuleMembers.map(member => {
                if (member?.member?.user?._id) {
                    result.push({
                        siteMemberId: member?._id,
                        userId: member?.member?.user?._id || "",
                        name: member?.member?.user?.name || "",
                        email: member?.member?.user?.email?.address || "",
                        phone: member?.member?.user?.phone?.number || ""
                    })
                }
            })

            return res.status(200).json({ notMaterialModuleMembers: result, success: true, error: "", message: "Not added in material module members fetched successfully." });
        }
        else {
            return res.status(200).json({ notMaterialModuleMembers: null, success: false, error: "Error: This type is not allowed.", message: "" });
        }

    } catch (error) {
        return res.status(500).json({ notMaterialModuleMembers: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAllNotMaterialModuleMemberController;