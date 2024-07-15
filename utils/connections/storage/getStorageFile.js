const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_ACCESS_SECRET,
    endpoint: new AWS.Endpoint('https://3e7cafe54ca91ebf65e89a8dc2ca5aa1.r2.cloudflarestorage.com'),
    region: 'auto',
    s3ForcePathStyle: true, // needed for custom endpoint
    signatureVersion: 'v4' // Ensure the signature version is v4
});

const getStorageFile = async (key) => {
    try {
        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: key,
            Expires: 200000
        };
        const url = s3.getSignedUrl("getObject", params);

        return { file: url, success: true, error: "", message: "File fetched successfully." };
    } catch (error) {
        return { file: null, success: false, error: `Error: ${error}`, message: "" };
    }
}

module.exports = getStorageFile;