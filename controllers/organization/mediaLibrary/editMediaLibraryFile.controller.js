const File = require("@/models/file/file.model");

const EditMediaLibraryFileController = async (req, res) => {
    const { name, alternative_text, caption } = req.body;
    const { id } = req.params;
    const { organization } = req.query;

    try {
        await File.findOneAndUpdate(
            {
                _id: id,
                organization: organization
            },
            {
                name: name,
                alternative_text: alternative_text,
                caption: caption,
                updatedBy: req.user._id
            }
        )

        return res.status(200).json({ success: true, error: "", message: "File details edited successfully." })
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = EditMediaLibraryFileController;