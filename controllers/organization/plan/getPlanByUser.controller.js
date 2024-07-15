const Plan = require("@/models/organization/main/plan.model");

const GetPlanByUserController = async (req, res) => {
    const { organization, plan } = req.query;

    try {
        const response = await Plan
            .findOne({ organization: organization })
            .select("subscription expiry")
            .populate({
                path: "subscription",
                select: `permissions.${plan}`
            });

        return res.status(200).json({ plan: response?.subscription?.permissions[plan] || false, success: true, error: "", message: "Plan details fetched successfully." });
    } catch (error) {
        return res.status(500).json({ plan: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetPlanByUserController;