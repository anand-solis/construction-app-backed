const Permission = require("@/models/organization/main/permission.model");
const Plan = require("@/models/organization/main/plan.model");

const getPermissionController = async (req, res) => {
    const { organization } = req.query;
    const { id } = req.params;

    const subscription = {
        project_management: ["sites", "site-members", "site-issues", "tasks", "task-members"],
        admin_settings: ["roles-and-permissions", "members", "organization-profile", "organization-plan"],
        media_library: ["media-library"],
        material_management: ["material-module-members", "indent", "purchase-orders", "grn-billings", "inventory", "material-issues"],
        labour_tracking_and_payable: ["attendance"],
        vendor_payable: ["vendor"],
        budget_calculation: ["bill-of-material", "material-transfer", "bill-of-quantity"]
    }

    const subscriptionKeys = Object.keys(subscription);

    try {
        const plan = await Plan
            .findOne({ organization: organization })
            .select("subscription")
            .populate({
                path: "subscription",
                select: {
                    "permissions": subscriptionKeys
                }
            })

        const permission = await Permission
            .findOne({ _id: id, organization: organization })
            .sort({ name: 1 })
            .select("name isAdmin features")
            .populate({
                path: "features.feature",
                select: ["name", "key"]
            })
            .populate({
                path: "createdBy",
                select: "name"
            });

        subscriptionKeys.map(key => {
            if (!plan.subscription.permissions[key]) {
                subscription[key].map(feature => {
                    const index = permission?.features?.findIndex(item => item.feature.key == feature);
                    permission?.features?.splice(index, 1);
                })
            }
        })

        return res.status(200).json({ permission: permission, success: true, error: "", message: "Permission fetched successfully." });
    } catch (error) {
        return res.status(500).json({ permission: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = getPermissionController;