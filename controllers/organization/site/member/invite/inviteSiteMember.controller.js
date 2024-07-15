const SiteMember = require("@/models/organization/site/main/siteMember.model");
const sendEmailController = require("@/controllers/app/email/sendEmail.controller");
const SiteInvite = require("@/templates/emails/SiteInvite.template");
const Member = require("@/models/organization/main/member.model");

const inviteSiteMemberController = async (req, res) => {
    const { members } = req.body;
    const { site, organization } = req.query;
    let emails = [];

    try {
        if (members) {
            await Promise.all(members.map(async (member) => {
                try {
                    const organizationMember = await Member
                        .findOne({ _id: member._id, organization: organization })
                        .select("user organization")
                        .populate({
                            path: "user",
                            select: "email.address"
                        });

                    if (organizationMember?._id) {
                        const check = await SiteMember
                            .findOne({ organization: organization, site: site, member: member._id })
                            .select("_id");

                        if (!check?._id) {
                            const newSiteMember = new SiteMember({
                                site: site,
                                member: member._id,
                                organization: organization
                            });

                            await newSiteMember.save();
                            emails.push(organizationMember.user.email.address);
                        }
                    }
                } catch (error) {
                    return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
                }
            }));

            if (emails.length > 0) {
                const emailParams = {
                    bcc: emails,
                    subject: "Added in Site Project",
                    content: SiteInvite()
                };

                await sendEmailController(emailParams);

                return res.status(201).json({ success: true, error: "", message: "All members added successfully in this site project." });
            } else {
                return res.status(409).json({ success: false, error: "No member added from your given list.", message: "" });
            }
        } else {
            return res.status(409).json({ success: false, error: "No members provided in your given list.", message: "" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
};

module.exports = inviteSiteMemberController;
