const SiteMember = require("@/models/organization/site/main/siteMember.model");
const Member = require("@/models/organization/main/member.model");

const getAllNotAddedSiteMemberController = async (req, res) => {
    const { site, organization } = req.query;

    try {
        const organizationMembers = await Member
            .find({ organization: organization })
            .select("user permission")
            .populate({
                path: "user",
                select: ["name", "email.address"],
            })
            .populate({
                path: "permission",
                select: "name"
            });

        const siteMembers = await SiteMember.find({ site: site }).select("member");

        const siteMemberIds = siteMembers.map(siteMember => siteMember.member.toString());

        const notSiteMembers = organizationMembers.filter(member => !siteMemberIds.includes(member._id.toString()));

        return res.status(200).json({ notSiteMembers: notSiteMembers, success: true, error: "", message: "Not added in site members fetched successfully." });

    } catch (error) {
        return res.status(500).json({ notSiteMembers: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = getAllNotAddedSiteMemberController;