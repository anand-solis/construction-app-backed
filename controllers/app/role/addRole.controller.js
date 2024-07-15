const Role = require("@/models/app/roles.model");

const AddRoleController = async (req, res) => {
    const { name } = req.body;

    try {
        const newRole = new Role({
            name: name
        })

        await newRole.save();

        return res.status(201).json({ success: true, error: "", message: "New role created successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = AddRoleController;