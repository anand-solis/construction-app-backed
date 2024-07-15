const Permission = require("@/models/organization/main/permission.model");

const getAllPermissionController = async (req, res) => {
    const { organization } = req.query;
    try{
        const permission = await Permission
        .find({ organization: organization })
        .sort({ name: 1 })
        .select("-organization -features")
        .populate({
            path: "createdBy",
            select: "name"
        })
        .populate({
            path: "updatedBy",
            select: "name"
        });

        return res.status(200).json({ permissions: permission, success: true, error: "", message: "All permissions fetched successfully." });
    } catch(error) {
        return res.status(500).json({ permissions: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = getAllPermissionController;