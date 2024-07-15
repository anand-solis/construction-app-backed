const Permission = require("@/models/organization/main/permission.model");

const UpdatePermissionNameController = async (req, res) => {
  const { organization, site ,permissionId} = req.query;
  try {
    const name = req.body;
    if (!permissionId) {
        return res.status(404).json({
          success: false,
          message: "Permission ID is required",
        });
      }
   
    const issueData = await Permission.findByIdAndUpdate(permissionId,name,{ runValidators: true });

    if (issueData) {
      return res.status(200).json({
        success: true,
        message: "Permission Updated successfully.",
      });
    } 
      return res.status(500).json({
        success: false,
        msg: "Failed to Updated Permission .",
      });
    
    
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Failed to update Permission.",
      error: err.message,
    });
  }
};

module.exports = UpdatePermissionNameController;
