const Member = require("@/models/organization/main/member.model");

const getAllMemberController = async (req, res) => {
    const { organization } = req.query;

    try {
        const members = await Member
            .find({ organization: organization })
            .select("user inviteAccepted permission isCreator reject")
            .populate({
                path: "user",
                select: ["name", "phone.number", "email.address"]
            })
            .populate({
                path: "permission",
                select: "name"
            })

        return res.status(200).json({ members: members, success: true, error: "", message: "Members fetched successfully." })
    } catch (error) {
        return res.status(500).json({ members: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = getAllMemberController;