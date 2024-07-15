const User = require("@/models/account/users.model");

const GetUsersCountController = async (req, res) => {
    try{
        const count = await User.find({}).count();

        return res.status(200).json({ count: count, success: true, error: "", message: "Users count fetched successfully." });
    } catch(error) {
        return res.status(500).json({ defaultPermission: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetUsersCountController;