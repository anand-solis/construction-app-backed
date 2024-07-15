const Subscription = require("@/models/app/subscription.model");
const Plan = require("@/models/organization/main/plan.model");

const createSubscriptionPlan = async (organizationId) => {
    const trialSubscriptionId = await Subscription.findOne({ isTrial: true}).select("_id");
    
    var currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);
    
    var nextMonthDate = new Date(currentDate);
    nextMonthDate.setUTCMonth(currentDate.getUTCMonth() + 1);

    try{
        const NewPlanAssign = new Plan({
            subscription: trialSubscriptionId._id,
            organization: organizationId,
            expiry: nextMonthDate
        });
    
        await NewPlanAssign.save();

        return { success: true, error: "", message: "Subscription assigned successfully." }
    } catch (error){
        return { success: false, error: `Error: ${error}`, message: "" }
    }
}

module.exports = createSubscriptionPlan;