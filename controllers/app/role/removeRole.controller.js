const Role = require("@/models/app/roles.model");

const RemoveRoleController = async (req, res) => {
    const { id } = req.params;

    try {
        await Role.deleteOne({ _id: id });

        return res.status(200).json({ success: true, error: "", message: "Role removed successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = RemoveRoleController;