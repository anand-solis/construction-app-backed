const Subscription = require("@/models/app/subscription.model");

const GetSubscriptionsCountController = async (req, res) => {
    try{
        const count = await Subscription.find({}).count();

        return res.status(200).json({ count: count, success: true, error: "", message: "Subscriptions count fetched successfully." });
    } catch(error) {
        return res.status(500).json({ defaultPermission: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetSubscriptionsCountController;