const DefaultPermission = require("@/models/app/defaultPermission.model");

const RemoveDefaultPermissionController = async (req, res) => {
    const { id } = req.params;

    try {
        const defaultPermission = await DefaultPermission.findOne({ _id: id }).select("isAdmin");

        if(defaultPermission?._id && !defaultPermission?.isAdmin){
            await DefaultPermission.deleteOne({ _id: id });
            return res.status(200).json({ success: true, error: "", message: "Default Permission removed successfully." });
        }
        else{
            return res.status(409).json({ success: false, error: "Admin default permission can't remove.", message: "" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = RemoveDefaultPermissionController;