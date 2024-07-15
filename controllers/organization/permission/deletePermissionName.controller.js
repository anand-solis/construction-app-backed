const Permission = require("@/models/organization/main/permission.model");

const deletePermissionController = async (req, res) => {
  try {
    const { organization, site ,permissionId} = req.query;
    let permissionData
    if(!permissionId){
        return res.status(404).json({
            success: false,
            Error: "",
            message: "Permission ID is required",
          });
    }
    permissionData= await Permission.findById(permissionId)
    if(!permissionData){
        return res.status(404).json({
            success: false,
            Error: "",
            message: "Permission Not Found ",
          });
    }
    permissionData= await Permission.findByIdAndDelete(permissionId)
   
    
    if (permissionData) {
      return res.status(200).json({
        success: true,
        message: "Permission delete successfully.",
      });
    } 
      return res.status(500).json({
        success: false,
        msg: "Failed to Permission deletion .",
      });
    
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      msg: "Failed to Permission deletion .",
      error: err.message,
    });
  }
};

module.exports = deletePermissionController;
