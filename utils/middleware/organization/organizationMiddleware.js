const Member = require("@/models/organization/main/member.model");
const Feature = require("@/models/app/features.model");
const Plan = require("@/models/organization/main/plan.model");
const Subscription = require("@/models/app/subscription.model");

const organizationMiddleware = async (req, res, next, key, rule, subscription, invitationSkip = false) => {
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
            if (!member?.organization?.blocked) {
                if (member.inviteAccepted || invitationSkip) {
                    let isRuleValid = null;
                    const feature = await Feature.findOne({ key: key }).select("_id");

                    if (feature?._id) {

                        member?.permission?.features?.map((singleFeature) => {
                            if (singleFeature.feature.toString() == feature._id.toString()) {
                                isRuleValid = singleFeature.permissions[rule]
                            }
                        })

                        if (isRuleValid) {
                            const plan = await Plan
                                .findOne({ organization: organization })
                                .select("subscription expiry")
                                .populate({
                                    path: "subscription",
                                    select: `permissions.${subscription}`
                                });

                            if (plan?._id) {
                                const today = new Date();
                                const dateToCheck = new Date(plan?.expiry);

                                if (!(dateToCheck < today)) {
                                    if (plan?.subscription.permissions[subscription]) {
                                        next();
                                    }
                                    else {
                                        return res.status(401).json({ success: false, error: "Error: You don't have permission to do this task, Upgrade your subscription.", message: "" });
                                    }
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
                            return res.status(401).json({ success: false, error: "Error: You don't have any permissions to do this task, Contact your organization admin.", message: "" });
                        }
                    }
                    else {
                        return res.status(401).json({ success: false, error: "Error: You don't have this feature.", message: "" })
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
        console.log(error)
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = organizationMiddleware;