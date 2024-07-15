const MaterialModuleMember = require("@/models/organization/site/material/main/materialModuleMember.model");

const GetAllMaterialModuleMemberController = async (req, res) => {
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
            const materialModuleMembers = await MaterialModuleMember
                .find({ organization: organization, site: site, type: type })
                .select("member")
                .populate({
                    path: "member",
                    select: "member",
                    populate: {
                        path: "member",
                        select: "user",
                        populate: [
                            {
                                path: "user",
                                select: ["name", "phone.number", "email.address"]
                            }
                        ]
                    }
                })

            let result = [];
            materialModuleMembers.map(member => {
                if (member?.member?.member?.user?._id) {
                    result.push({
                        materialModuleMemberId: member?._id,
                        siteMemberId: member?.member?._id,
                        userId: member?.member?.member?.user?._id || "",
                        name: member?.member?.member?.user?.name || "",
                        email: member?.member?.member?.user?.email?.address || "",
                        phone: member?.member?.member?.user?.phone?.number || ""
                    })
                }
            })

            return res.status(200).json({ materialModuleMembers: result, success: true, error: "", message: `Material module added members for ${type} fetched successfully.` });
        }
        else {
            return res.status(200).json({ materialModuleMembers: null, success: false, error: "Error: This type is not allowed.", message: "" });
        }

    } catch (error) {
        return res.status(500).json({ materialModuleMembers: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAllMaterialModuleMemberController;