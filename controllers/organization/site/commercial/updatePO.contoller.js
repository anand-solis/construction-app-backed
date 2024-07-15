const PO = require("@/models/organization/site/commercial/po.model");

const UpdatePurchaseOrder = async (req, res) => {
  const { organization, site } = req.query;
  const { id } = req.params;
  try {
    const UpdatedPO = await PO.findOneAndUpdate({ _id: id });

    if (!UpdatedPO) {
      return res.status(404).json({
        success: false,
        message: "Purchase Data not found.",
      });
    }
    return res.status(200).json({
      success: true,
      data: UpdatedPO,
      message: "Purchase Data updated Successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      Error: err,
      message: "Failed to Update Purchase Order.",
    });
  }
};

module.exports = UpdatePurchaseOrder;
