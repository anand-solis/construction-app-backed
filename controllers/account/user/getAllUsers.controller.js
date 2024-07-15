const User = require("@/models/account/users.model");

const GetAllUsersController = async (req, res) => {
    try {
        const users = await User.find({}).select("name email phone blocked loggedInTime isSuperAdmin createdAt updatedAt");

        return res.status(200).json({ users: users, success: true, error: "", message: "Users fetched successfully." });
    } catch (error) {
        return res.status(500).json({ users: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAllUsersController;