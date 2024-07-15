const File = require("@/models/file/file.model");
const removeStorageFile = require("@/utils/connections/storage/removeStorageFile");

const RemoveMediaLibraryFileController = async (req, res) => {
    const { id } = req.params;
    const { organization } = req.query;

    try {
        const file = await File.findOne({ _id: id, organization: organization }).select("used url");

        if (file?._id) {
            if (!file.used) {
                const removeFile = await removeStorageFile(file.url);

                if (removeFile.success) {
                    await File.deleteOne({ _id: id, organization: organization });

                    return res.status(200).json({ success: true, error: "", message: "File removed successfully." })
                }
                else {
                    return res.status(200).json({ success: true, error: "", message: "Something went wrong, Try again." })
                }
            }
            else {
                return res.status(200).json({ success: true, error: "", message: "File is in use by any operation in your organization." })
            }
        }
        else {
            return res.status(200).json({ success: true, error: "", message: "File not found." })
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = RemoveMediaLibraryFileController;