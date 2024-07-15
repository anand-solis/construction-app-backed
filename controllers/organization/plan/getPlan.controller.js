const Plan = require("@/models/organization/main/plan.model");

const getPlanController = async (req, res) => {
    const { organization } = req.query;

    try {
        const plan = await Plan
            .findOne({ organization: organization })
            .select("subscription expiry")
            .populate({
                path: "subscription",
                select: ["-__v", "-createdAt", "-updatedAt"]
            });

        return res.status(200).json({ plan: plan, success: true, error: "", message: "Plan details fetched successfully." });
    } catch (error) {
        return res.status(500).json({ plan: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = getPlanController;