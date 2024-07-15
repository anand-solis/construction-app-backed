const DefaultPermission = require("@/models/app/defaultPermission.model");

const GetAllDefaultPermissionController = async (req, res) => {
    try{
        const defaultPermission = await DefaultPermission
        .find({})
        .sort({ name: 1 })
        .select("-features");

        return res.status(200).json({ defaultPermissions: defaultPermission, success: true, error: "", message: "All default permissions fetched successfully" });
    } catch(error) {
        return res.status(500).json({ defaultPermissions: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAllDefaultPermissionController;