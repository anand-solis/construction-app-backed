const File = require("@/models/file/file.model");

const GetAllMediaLibraryFilesController = async (req, res) => {
    const { organization } = req.query;

    try {
        const files = await File.find({ organization: organization });

        return res.status(200).json({ files: files, success: true, error: "", message: "Files fetched successfully." })
    } catch (error) {
        return res.status(500).json({ files: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAllMediaLibraryFilesController;