const AWS = require("aws-sdk");

const storage = new AWS.S3({
    signatureVersion: "v4",
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_ACCESS_SECRET
    }
})

module.exports = storage;