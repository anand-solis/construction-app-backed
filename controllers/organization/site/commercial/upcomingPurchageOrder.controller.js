const PO = require("@/models/organization/site/commercial/po.model");
const { default: mongoose } = require("mongoose");
const pagination = require("../../../../utils/pagination");
const { populate } = require("@/models/organization/stock/inventory.model");

const getUpcomingPurchaseOrder = async (req, res) => {

  try {
    const { organization, site, limit, page, status } = req.query;

    let { skip, perPage } = await pagination(page, limit)
    let matchObj = {
      organization: new mongoose.Types.ObjectId(organization)
    }
    if (site) {
      matchObj["site"] = new mongoose.Types.ObjectId(site)
    }
    if (status) {
      matchObj["poOrderedStatus"] = status

    }
    const POData = await PO.find(matchObj)
      .populate({
        path: "indentId.id",
        populate: [
          {
            path: "materialId",
          },
          {
            path: "assignUser",
          },
          {
            path: "createdBy",
            select: "name email"
          },
        ],
      })
      .populate({
        path:"material.itemDetails"
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
      }).populate("createdBy")
      .populate({
        path:"site",
        select:"siteOfficeId sitePocId",
        populate:[
          {
            path:"siteOfficeId",
            select:"name"
          },
          {
            path:"sitePocId",
            select:"name"
          }
        ]
      })
    if(POData.length){
      return res.status(200).json({
        success: true,
        data: POData,
        message: "Purchase Data Get Successfully.",
      });
    }
    return res.status(404).json({
      success: true,
      data: POData,
      message: "Purchase Data not Found",
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      Error: err,
      message: "Failed to get Purchase Order.",
    });
  }
};

module.exports = getUpcomingPurchaseOrder;
