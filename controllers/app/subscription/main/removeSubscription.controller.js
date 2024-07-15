const Subscription = require("@/models/app/subscription.model");

const RemoveSubscriptionController = async (req, res) => {
    const { id } = req.params;

    try {
        const subscription = await Subscription.findOne({ _id: id }).select("isTrial");

        if(subscription?._id && !subscription?.isTrial){
            await Subscription.deleteOne({ _id: id });
            return res.status(200).json({ success: true, error: "", message: "Subscription removed successfully." });
        }
        else{
            return res.status(409).json({ success: false, error: "Trial subscription can't remove.", message: "" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = RemoveSubscriptionController;