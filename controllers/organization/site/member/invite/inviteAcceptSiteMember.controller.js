const SiteMember = require("@/models/organization/site/main/siteMember.model");
const Member = require("@/models/organization/main/member.model");

const inviteAcceptSiteMemberController = async (req, res) => {
    const { organization, site } = req.query;

    try {
        const member = await Member.findOne({ user: req.user._id, organization: organization }).select("_id");

        if(member?._id){
            await SiteMember.findOneAndUpdate(
                { site: site, organization: organization, member: member._id },
                { inviteAccepted: true }
            );

            return res.status(200).json({ success: true, error: "", message: "You successfully accept the site project invitation." });
        }
        else{
            return res.status(409).json({ success: false, error: "You are not in this organization.", message: "" });
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = inviteAcceptSiteMemberController;