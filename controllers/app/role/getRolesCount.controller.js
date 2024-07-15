const Role = require("@/models/app/roles.model");

const GetRolesCountController = async (req, res) => {
    try{
        const count = await Role.find({}).count();

        return res.status(200).json({ count: count, success: true, error: "", message: "Roles count fetched successfully." });
    } catch(error) {
        return res.status(500).json({ defaultPermission: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetRolesCountController;