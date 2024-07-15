const PO = require("@/models/organization/site/commercial/po.model");
const uploadStorageFile = require("@/utils/connections/storage/uploadStorageFile")
const { default: mongoose } = require("mongoose");

const AddPurchaseOrderProfile = async (req, res) => {
  try {
  const { organization, site ,poId} = req.query;
    if(!poId){
        return res.status(404).json({
            success: false,
            message: "PO Id is required",
          });
    }
    const response = await uploadStorageFile(req, ["image"]);
   if(response?.success){
     const purchaseorder = await PO.findByIdAndUpdate(poId,{profile:response?.file}); 
     return res.status(200).json({
        success: true,
        message: "Profile added successfully.",
      });
   }

    return res.status(200).json({
      success: false,
      message: "profile Not added ",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to Add Profile",
    });
  }
};

module.exports = AddPurchaseOrderProfile;
