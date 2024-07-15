const SiteMember = require("@/models/organization/site/main/siteMember.model");

const getAllAddedSiteMemberController = async (req, res) => {
    const { site, organization } = req.query;

    try {
        const siteMember = await SiteMember
            .find({ organization: organization, site: site })
            .select("member inviteAccepted reject")
            .populate({
                path: "member",
                select: ["user", "permission", "inviteAccepted", "isCreator"],
                populate: [
                    {
                        path: "user",
                        select: ["name", "phone.number", "email.address"]
                    },
                    {
                        path: "permission",
                        select: "name"
                    }
                ]
            })

        return res.status(200).json({ siteMembers: siteMember, success: true, error: "", message: "Site members fetched successfully." });

    } catch (error) {
        return res.status(500).json({ siteMembers: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = getAllAddedSiteMemberController;