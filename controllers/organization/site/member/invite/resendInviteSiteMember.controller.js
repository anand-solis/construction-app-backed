const SiteMember = require("@/models/organization/site/main/siteMember.model");

const inviteAcceptSiteMemberController = async (req, res) => {
    const { organization, site } = req.query;
    const { id } = req.params;

    try {
        await SiteMember.findOneAndUpdate(
            { site: site, organization: organization, member: id },
            {
                inviteAccepted: false,
                reject: { status: false }
            }
        );

        return res.status(200).json({ success: true, error: "", message: "You successfully resend the site project invitation." });

    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = inviteAcceptSiteMemberController;