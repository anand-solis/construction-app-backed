const Subscription = require("@/models/app/subscription.model");

const GetAllSubscriptionsController = async (req, res) => {
    try {
        const subscriptions = await Subscription.find({})
            .select("title description price isTrial sub_title");

        return res.status(200).json({ subscriptions: subscriptions, success: true, error: "", message: "Subscriptions fetched successfully." });
    } catch (error) {
        return res.status(500).json({ subscriptions: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAllSubscriptionsController;