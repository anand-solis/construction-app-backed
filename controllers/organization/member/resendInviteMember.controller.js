const Member = require("@/models/organization/main/member.model");

const inviteAcceptMemberController = async (req, res) => {
    const { organization } = req.query;
    const { id } = req.params;

    try {
        await Member.findOneAndUpdate(
            { organization: organization, user: id },
            { inviteAccepted: false, reject: { status: false } }
        )

        return res.status(200).json({ success: true, error: "", message: "You successfully resend the organization invitation." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = inviteAcceptMemberController;