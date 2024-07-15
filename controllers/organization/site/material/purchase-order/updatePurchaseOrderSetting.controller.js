const PurchaseOrderSetting = require("@/models/organization/site/material/purchase-order/purchaseOrderSetting.model");

const UpdatePurchaseOrderSettingController = async (req, res) => {
    const { organization, site } = req.query;
    const { prefix, tnc ,gst} = req.body;
    const result = prefix.trim().replace(/\s+/g, "-").replace(/-+/g, "-").replace(/[^-\w\s]/g, "");

    try {
        await PurchaseOrderSetting.findOneAndUpdate(
            { organization: organization, site: site },
            {
                prefix: result,
                tnc: tnc,
                gst:gst,
            }
        );

        return res.status(200).json({ success: true, error: "", message: "Purchase Order Settings updated successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = UpdatePurchaseOrderSettingController;