const User = require("@/models/account/users.model");
const File = require("@/models/file/file.model");
const uploadStorageFile = require("@/utils/connections/storage/uploadStorageFile");
const removeStorageFile = require("@/utils/connections/storage/removeStorageFile");
const AssignJWTToken = require("@/controllers/account/login/AssignToken.controller");
const { sqliteInsert, sqliteDelete } = require("@/utils/connections/database/sqlite");

const UpdateProfileController = async (req, res) => {
    try {
        const response = await uploadStorageFile(req, ["image"]);
        let prev
        if (response.success) {
            prev = await User.findOne({ _id: req.user._id }).select("profile email phone")
                .populate({
                    path: "profile",
                    select: "url"
                });
            if (prev?.profile?._id) {
                const removeFile = await removeStorageFile(prev.profile?.url);

                if (removeFile.success) {
                    await File.deleteOne({ _id: prev.profile._id });
                }
            }

            await User.findOneAndUpdate(
                { _id: req.user._id },
                { profile: response.file }
            )
        }

        const updatedFields = {};
        if (response?.fields?.name?.[0] !== undefined) updatedFields.name = response.fields.name[0];
        if (response?.fields?.role?.[0] !== undefined) updatedFields.role = response.fields.role[0];
        if (response?.fields?.email?.[0]) {

            updatedFields["email.address"] = response.fields.email[0]
            updatedFields["email.isValid"] = prev?.email.isValid

        }
        const updatedUser = await User.findByIdAndUpdate(

            req.user._id
            ,
            updatedFields,
            { new: true }

        );
        return res.status(200).json({ success: true, error: "", message: "User profile updated successfully." });

    } catch (error) {
        console.log("err...................", error)
        return res.status(500).json({ token: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = UpdateProfileController;