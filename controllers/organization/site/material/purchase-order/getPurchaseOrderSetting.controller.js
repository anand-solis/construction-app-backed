const PurchaseOrderSetting = require("@/models/organization/site/material/purchase-order/purchaseOrderSetting.model");

const GetPurchaseOrderSettingController = async (req, res) => {
    const { organization, site } = req.query;

    try {
        let result;

        const purchaseOrderSettings = await PurchaseOrderSetting
            .findOne({ organization: organization, site: site }).populate({path:'organization',select:"-_id name email address city pin_code state"})
           

        if (purchaseOrderSettings?._id) {
            result = purchaseOrderSettings;
        }
        else {
            const newPurchaseOrderSettings = await PurchaseOrderSetting.create({
                organization: organization,
                site: site
            });

            result = {
                _id: newPurchaseOrderSettings?._id,
                prefix: newPurchaseOrderSettings?.prefix,
                tnc : newPurchaseOrderSettings?.tnc
            };
        }

        return res.status(200).json({ purchaseOrderSettings: result, success: true, error: "", message: "Purchase Order Settings fetched successfully." });
    } catch (error) {
        return res.status(500).json({ purchaseOrderSettings: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetPurchaseOrderSettingController;