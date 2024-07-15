const storage = require("@/utils/connections/storage/connectStorage");

const removeStorageFile = async (path) => {
    try {
        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: path
        };

        await storage.deleteObject(params).promise();

        return { success: true, error: "", message: "File removed successfully." };
    } catch (error) {
        return { file: null, success: false, error: `Error: ${error}`, message: "" };
    }
}

module.exports = removeStorageFile;