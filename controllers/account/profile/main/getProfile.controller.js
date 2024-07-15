const User = require("@/models/account/users.model");
const getStorageFile = require("@/utils/connections/storage/getStorageFile");

const GetProfileController = async (req, res) => {
    try {
        const user = await User
            .findOne({ _id: req.user._id })
            .select("name profile email phone role isSuperAdmin")
            .populate({
                path: "role",
                select: "name"
            })
            .populate(
                "profile",
                {
                    url: 1,
                    _id: 0
                }
            );

        const profile = await getStorageFile(user?.profile?.url);
        user.profileUrl = profile.file;

        return res.status(200).json({ user: user,profileUrl:profile.file, success: true, error: "", message: "User details fetched successfully." });
    } catch (error) {
        return res.status(500).json({ user: null,profileUrl:null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetProfileController;