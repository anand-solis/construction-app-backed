const Member = require("@/models/organization/main/member.model");
const Plan = require("@/models/organization/main/plan.model");

const organizationMemberMiddleware = async (req, res, next, invitationSkip = false) => {
    const { organization } = req.query;

    try {
        const member = await Member
            .findOne({ user: req?.user?._id, organization: organization })
            .select("permission inviteAccepted")
            .populate("permission")
            .populate({
                path: "organization",
                select: "blocked"
            })

        if (member?._id) {
            if (!member.organization.blocked) {
                if (member.inviteAccepted || invitationSkip) {
                    const plan = await Plan
                        .findOne({ organization: organization })
                        .select("expiry");

                    if (plan?._id) {
                        const today = new Date();
                        const dateToCheck = new Date(plan?.expiry);

                        if (!(dateToCheck < today)) {
                            next();
                        }
                        else {
                            return res.status(401).json({ success: false, error: "Error: Your organization subscription plan is expired.", message: "" });
                        }
                    }
                    else {
                        return res.status(401).json({ success: false, error: "Error: You don't have any valid subscription plan.", message: "" });
                    }
                }
                else {
                    return res.status(401).json({ success: false, error: "Error: Accept invite for this organization.", message: "" });
                }
            }
            else {
                return res.status(401).json({ success: false, error: "Error: Your Organization is blocked.", message: "" });
            }
        }
        else {
            return res.status(401).json({ success: false, error: "Error: You are not in this organization.", message: "" });
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = organizationMemberMiddleware;