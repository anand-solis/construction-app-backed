const PO = require("@/models/organization/site/commercial/po.model");

const GetAllPurchaseOrder = async (req, res) => {
  const { organization, site } = req.query;

  try {
    console.log("..............................................")
    const POData = await PO.find({ organization: organization })
    .populate({
      path: "createdBy",
      select: "name",
    })
    .populate({
      path: "indentId.id",
      select: "indentId",
    })
      .populate({
        path: "site",
        select: "",
      })
      .populate({
        path: "indentId",
        populate: [
          {
            path: "materialId",
          },
          {
            path: "assignUser",
          },
          {
            path: "createdBy",
            select: "name email",
          },
        ],
      })
      .populate({
        path: "vendorId",
        populate: [
          {
            path: "vendor",
          },
          {
            path: "finaicialdetails",
          },
          {
            path: "termsAndCondition",
          },
        ],
        select: "finaicialdetails vendor termsAndCondition",
      })
      .populate({
        path: "material.itemDetails",
      });
    return res.status(200).json({
      success: true,
      data: POData,
      message: "All Purchase Orders  Get Successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      Error: err,
      message: "Failed to get All Purchase Orders.",
    });
  }
};

module.exports = GetAllPurchaseOrder;
