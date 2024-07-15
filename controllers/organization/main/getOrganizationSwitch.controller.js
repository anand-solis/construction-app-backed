const Member = require("@/models/organization/main/member.model");
const Organization = require("@/models/organization/main/organization.model");

const getOrganizationSwitchController = async (req, res) => {
    try {
        const members = await Member.find({ user: req?.user?._id, "reject.status": false }).select("organization inviteAccepted");

        if(members.length == 0){
            return res.status(200).json({ organizations: null, success: false, error: "You are not any organization.", message: "" });
        }
        else{
            const haveOrganizationIds = members.map(member => member.organization);

            const organizations = await Organization.find({ _id: { $in: haveOrganizationIds } }).select("name").sort({ createdAt: -1 });

            let organizationsWithInviteStatus = [];

            organizations.map((organization) => {
                const index = members ? members.findIndex(item => item.organization.toString() == organization._id.toString()) : -1;

                organizationsWithInviteStatus.push({
                    _id: organization._id,
                    name: organization.name,
                    inviteAccepted: members[index].inviteAccepted
                });
            })

            return res.status(200).json({ organizations: organizationsWithInviteStatus, success: true, error: "", message: "Organizations fetched successfully." });
        }
    } catch (error) {
        return res.status(500).json({ organizations: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = getOrganizationSwitchController;