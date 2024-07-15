const DefaultPermission = require("@/models/app/defaultPermission.model");

const GetDefaultPermissionsCountController = async (req, res) => {
    try{
        const count = await DefaultPermission.find({}).count();

        return res.status(200).json({ count: count, success: true, error: "", message: "Default Permissions count fetched successfully." });
    } catch(error) {
        return res.status(500).json({ defaultPermission: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetDefaultPermissionsCountController;