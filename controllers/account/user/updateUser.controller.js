const User = require("@/models/account/users.model");

const UpdateUserController = async (req, res) => {
    const { id } = req.params;
    const { blocked } = req.body;

    try {
        await User.findOneAndUpdate(
            { _id: id },
            { blocked: blocked }
        )

        return res.status(200).json({ success: true, error: "", message: `User ${blocked ? "blocked" : "unblocked"} successfully.` });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = UpdateUserController;