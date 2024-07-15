const Member = require("@/models/organization/main/member.model");

const inviteAcceptMemberController = async (req, res) => {
    const { organization } = req.query;

    try {
        await Member.findOneAndUpdate(
            { organization: organization, user: req.user._id },
            { inviteAccepted: true }
        )

        return res.status(200).json({ success: true, error: "", message: "You successfully accept the organization invitation." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = inviteAcceptMemberController;