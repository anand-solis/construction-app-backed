const DefaultPermission = require("@/models/app/defaultPermission.model");

const GetDefaultPermissionController = async (req, res) => {
    const { id } = req.params;
    try{
        const defaultPermission = await DefaultPermission
        .findOne({ _id: id })
        .select("name isAdmin features")
        .populate({
            path: "features.feature",
            select: ["name", "key", "description"]
        });

        return res.status(200).json({ defaultPermission: defaultPermission, success: true, error: "", message: "Default Permission fetched successfully." });
    } catch(error) {
        return res.status(500).json({ defaultPermission: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetDefaultPermissionController;