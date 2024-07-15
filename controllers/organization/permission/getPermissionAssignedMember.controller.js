const Member = require("@/models/organization/main/member.model");

const getPermissionAssignedMemberController = async (req, res) => {
    const { id } = req.params;
    const { organization } = req.query;

    try {
        const members = await Member
            .find({ permission: id, organization: organization })
            .select("user inviteAccepted permission isCreator")
            .populate({
                path: "user",
                select: ["name", "phone.number", "email.address"]
            })
            .populate({
                path: "permission",
                select: "name"
            });

        return res.status(200).json({ members: members, success: true, error: "", message: "Members by permission fetched successfully." })
    } catch (error) {
        return res.status(500).json({ members: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = getPermissionAssignedMemberController;