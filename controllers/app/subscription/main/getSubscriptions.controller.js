const Subscription = require("@/models/app/subscription.model");

const GetSubscriptionsController = async (req, res) => {
    const { id } = req.params;

    try{
        const subscription = await Subscription.findOne({ _id: id }).select("-createdAt -updatedAt -__v")

        return res.status(200).json({ subscription: subscription, success: true, error: "", message: "Subscription fetched successfully." });
    } catch(error) {
        return res.status(500).json({ subscription: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetSubscriptionsController;