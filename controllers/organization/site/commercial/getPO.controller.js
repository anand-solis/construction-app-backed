const PO = require("@/models/organization/site/commercial/po.model");
const { default: mongoose } = require("mongoose");
const pagination = require("../../../../utils/pagination")

const GetPurchaseOrder = async (req, res) => {
  const { organization, site,limit,page } = req.query;

  try {
   let  {skip,perPage} = await pagination(page,limit)
    let matchObj = {
      organization: new mongoose.Types.ObjectId(organization)
    }
    if(site){
      matchObj["site"] = new mongoose.Types.ObjectId(site)
    }
    const POData = await PO.find(matchObj)
      .skip(skip)
      .limit(perPage)
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
            select:"name email"
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
      }).populate("createdBy");

    return res.status(200).json({
      success: true,
      data: POData,
      message: "Purchase Data Get Successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      Error: err,
      message: "Failed to get Purchase Order.",
    });
  }
};

module.exports = GetPurchaseOrder;
