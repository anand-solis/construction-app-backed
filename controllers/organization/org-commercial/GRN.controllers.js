const GRNModels = require("@/models/organization/main/GRN.model");
const POModels = require("@/models/organization/site/commercial/po.model")
const { default: mongoose } = require("mongoose");


const addGRNControllers = async (req, res) => {

  try {
    const { organization, site, poId } = req.query;
    let payload = req.body
    let user = req.user
    let userId = user?._id
    let grnMaterial = payload?.material
    let PODetails = await POModels.findById(poId)
    let poMaterial = PODetails?.material
    for (let i = 0; i < poMaterial.length; i++) {
      let poMaterialId = poMaterial[i]?.itemDetails?.toString()
      let POQuantity = poMaterial[i]?.quantity
      for (let j = 0; j < grnMaterial.length; j++) {
        let grnMaterialId = grnMaterial[j]?.itemDetails?.toString()
        if (grnMaterialId == poMaterialId) {
          grnMaterial[j]["orderedQuantity"] = POQuantity
        }

      }
    }
    let lastCreatedIndent = await GRNModels.aggregate([
      {
        $match: {
          organization: new mongoose.Types.ObjectId(organization),
          site: new mongoose.Types.ObjectId(site),
        }
      },
      {
        '$sort': {
          'createdAt': -1
        }
      }, {
        '$limit': 1
      }
    ])
    let GRNId
    if (lastCreatedIndent.length) {
      let preGRN = lastCreatedIndent[0]?.GRNId
      if (!preGRN) {
        GRNId = "GRN000001"
      } else {
        preGRN = +preGRN.split("GRN")[1]
        preGRN = (preGRN + 1).toString()
        preGRN = preGRN.padStart(6, "0")
        GRNId = "GRN" + preGRN
      }

    } else {
      GRNId = "GRN000001"
    }
    const GRNData = await GRNModels.create({ ...payload, organization, site, poId, createdBy: userId, GRNId: GRNId })
    if (GRNData) {
      return res.status(201).json({
        success: true,
        data: GRNData,
        message: "GRN created successfully !",
      });
    }
    return res.status(404).json({
      success: true,
      data: GRNData,
      message: "GRN not created ",
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      Error: err,
      message: "Failed to creat GRN",
    });
  }
};

const deliveryItemController = async (req, res) => {

  try {
    const { organization, site, poId } = req.query;
    if (!poId) {
      return res.status(404).json({
        success: true,
        data: GRNData,
        message: "PO id is required ",
      });
    }
    // indentpayload["GRNId"] = GRNId
    const GRNData = await POModels.aggregate([
      {
        '$match': {
          '_id': new mongoose.Types.ObjectId(poId)
        }
      }, {
        '$lookup': {
          'from': 'indents',
          'localField': 'indentId.id',
          'foreignField': '_id',
          'as': 'indents'
        }
      },
      //  {
      //   '$unwind': {
      //     'path': '$indents'
      //   }
      // },
      {
        '$lookup': {
          'from': 'grns',
          'localField': '_id',
          'foreignField': 'poId',
          'as': 'deliveredItems'
        }
      }, {
        '$lookup': {
          'from': 'materials',
          'localField': 'material.itemDetails',
          'foreignField': '_id',
          'as': 'materialDetails'
        }
      },
      {
        $project: {
          "indents.indentId": 1,
          "deliveredItems.GRNId": 1,
          "deliveredItems.material": 1,
          materialDetails: 1


        }
      }
    ])
    if (GRNData.length) {
      return res.status(200).json({
        success: true,
        data: GRNData,
        message: "Data found successfully !",
      });
    }
    return res.status(404).json({
      success: true,
      data: GRNData,
      message: "Data not found ",
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      Error: err,
      message: "Some thing went worng",
    });
  }
};
const getAllGRN = async (req, res) => {

  try {
    const { organization, site, poId } = req.query;
    let matchObj = {}
    if (!organization) {
      return res.status(404).json({
        success: true,
        data: GRNData,
        message: "Organization is required ",
      });
    }
    matchObj["organization"] = new mongoose.Types.ObjectId(organization)
    if (site) {
      matchObj["site"] = new mongoose.Types.ObjectId(site)

    }
    // indentpayload["GRNId"] = GRNId
    const GRNData = await GRNModels.aggregate([
      {
        '$match': matchObj
      },
      {
        '$lookup': {
          'from': 'users',
          'localField': 'createdBy',
          'foreignField': '_id',
          'as': 'createdBy'
        }
      },
      {
        $unwind: "$createdBy"
      },
      {
        '$lookup': {
          'from': 'sites',
          'localField': 'site',
          'foreignField': '_id',
          'as': 'site'
        }
      },
      {
        $unwind: "$site"
      },
      {
        '$lookup': {
          'from': 'purchaseorders',
          'localField': 'poId',
          'foreignField': '_id',
          'as': 'poDetails'
        }
      },

      {
        '$lookup': {
          from: "rootvendors",
          localField: "poDetails.vendorId",
          foreignField: "_id",
          as: "vendorId"
        }
      },
      {
        '$lookup': {
          from: "vendordetails",
          localField: "vendorId.vendor",
          foreignField: "_id",
          as: "vendordetails"
        }
      },
      {
        '$lookup': {
          'from': 'materials',
          'localField': 'poDetails.material.itemDetails',
          'foreignField': '_id',
          'as': 'materialDetails'
        }
      },
      {
        $project: {
          "createdBy.name": 1,
          "GRNId": 1,
          "poDetails.poId": 1,
          "poDetails.createdAt": 1,
          materialDetails: 1,
          invoice: 1,
          "site.name": 1,
          "vendordetails.vendorName": 1,
          "createdAt": 1,
          remark: 1



        }
      }
    ])
    if (GRNData.length) {
      return res.status(200).json({
        success: true,
        data: GRNData,
        message: "Data found successfully !",
      });
    }
    return res.status(404).json({
      success: true,
      data: GRNData,
      message: "Data not found ",
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      Error: err,
      message: "Some thing went worng",
    });
  }
};

const deleteGRNController = async (req, res) => {
  const { organization, id } = req.query;
  try {
    let GRNDetails
    if (!id) {
      return res.status(404).json({
        success: false,
        Error: "",
        message: "GRN ID is required",
      });
    }

    GRNDetails = await GRNModels.findById(id)
    if (!GRNDetails) {
      return res.status(404).json({
        success: true,
        Error: "",
        message: "GRN Not Found ",
      });
    }
    GRNDetails = await GRNModels.findByIdAndDelete(
      id,
    )
    if (GRNDetails) {
      return res.status(200).json({ success: true, error: "", message: "GRN Deleted successfully." });
    }

    return res.status(400).json({ success: false, error: "", message: "GRN not Deleted " });

  } catch (error) {
    return res.status(500).json({ success: false, error: `Error ${error}`, message: "" });
  }
};
const updateGRNController = async (req, res) => {

  try {
    const { organization, id } = req.query;
    let GRNDetails
    let payload = req.body
    if (!id) {
      return res.status(404).json({
        success: false,
        Error: "",
        message: "GRN ID is required",
      });
    }

    GRNDetails = await GRNModels.findById(id)
    if (!GRNDetails) {
      return res.status(404).json({
        success: true,
        Error: "",
        message: "GRN Not Found ",
      });
    }
    GRNDetails = await GRNModels.findByIdAndUpdate(
      id,
      payload
    )
    if (GRNDetails) {
      return res.status(200).json({ success: true, error: "", message: "GRN Update successfully." });
    }

    return res.status(400).json({ success: false, error: "", message: "GRN not Update " });

  } catch (error) {
    return res.status(500).json({ success: false, error: `Error ${error}`, message: "" });
  }
};

module.exports = {
  addGRNControllers,
  deliveryItemController,
  getAllGRN,
  deleteGRNController,
  updateGRNController
}
