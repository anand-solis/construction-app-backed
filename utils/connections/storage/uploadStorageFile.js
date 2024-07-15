const storage = require("@/utils/connections/storage/connectStorage");
const formidable = require("formidable");
const fs = require("fs");
const File = require("@/models/file/file.model");

const uploadStorageFile = async (req, allowed) => {
    try {
        const form = new formidable.IncomingForm();
        const parseForm = () => {
            return new Promise((resolve, reject) => {
                form.parse(req, (err, fields, files) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ files, fields });
                    }
                });
            });
        };

        const { files, fields } = await parseForm();

        if (files && files.attachment && files.attachment[0]) {
            let { organization } = req.query;
            let mime = files.attachment[0].mimetype;
            let type = mime.split("/")[0];
            let extension = mime.split("/").pop();
            let size = files.attachment[0].size;
            let path = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${extension}`;
            let file = files.attachment[0].filepath;
            let name = files.attachment[0].originalFilename;
            let createdBy = req.user._id;
            let updatedBy = req.user._id;

            const rules = {
                image: {
                    size: 5000000, // 5MB
                    extension: ["png", "jpeg", "jpg"]
                },
                application: {
                    size: 10000000, // 10MB
                    extension: ["docs", "pdf", "xlsx", "csv"]
                },
                video: {
                    size: 100000000, // 100MB
                    extension: ["mp4", "mkv"]
                }
            }

            async function AddFile() {
                try {
                    const params = {
                        Bucket: process.env.S3_BUCKET,
                        Key: path,
                        Body: fs.createReadStream(file),
                        ContentType: extension,
                        ContentLength: size
                    };
    
                    await storage.putObject(params).promise();
    
                    const addedFile = await File.create({
                        organization: organization,
                        name: name,
                        alternative_text: name,
                        caption: name,
                        extension: extension,
                        mime: mime,
                        size: size,
                        url: path,
                        createdBy: createdBy,
                        updatedBy: updatedBy,
                        used: true
                    })
    
                    return { fields: fields, file: addedFile?._id, success: true, error: "", message: "File uploaded successfully." };
                } catch (error) {
                    console.log(error)
                    return { fields: fields, file: null, success: false, error: `Error: ${error}`, message: "" };
                }
            }

            if (allowed.includes("image") && rules.image.extension.includes(extension)) return await AddFile();
            else if (allowed.includes("application") && rules.application.extension.includes(extension)) return await AddFile();
            else if (allowed.includes("video") && rules.video.extension.includes(extension)) return await AddFile();
            else {
                if(allowed.includes(type)) {
                    return { fields: fields, file: null, success: false, error: `Only these extensions allowed for ${type == "application" ? "documentation" : type} upload are (${rules?.[type]?.extension.join(", ") || "none"}).`, message: "" };
                }
                else {
                    return { fields: fields, file: null, success: false, error: `Only these file types are allowed (${allowed?.join(", ") || "none"}).`, message: "" };
                }
            }
        }
        else {
            return { fields: fields, file: null, success: false, error: "No file attached in the request.", message: "" };
        }
    } catch (error) {
        console.log(error)
        return { fields: fields, file: null, success: false, error: `Error: ${error}`, message: "" };
    }
}

module.exports = uploadStorageFile;