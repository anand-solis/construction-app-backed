const Site = require("@/models/organization/site/main/site.model");
const getStorageFile = require("@/utils/connections/storage/getStorageFile");
const { default: mongoose } = require("mongoose");

const GetSiteDocumentController = async (req, res) => {
    try {
        const { organization, site } = req.query;
        let siteDetails = await Site.aggregate([
            {
                '$match': {
                    '_id': new mongoose.Types.ObjectId(site)
                }
            },
            {
                '$lookup': {
                    'from': 'files',
                    'localField': 'siteDocuments.file',
                    'foreignField': '_id',
                    'as': 'files'
                }
            }
        ])
        siteDetails = siteDetails[0]?.files
        let fileArray = []
        for (let i = 0; i < siteDetails?.length; i++) {
            if (siteDetails[i]) {
                let profile = await getStorageFile(siteDetails[i]?.url);
                fileArray.push({
                    file: profile?.file
                })

            }

        }

        if (!fileArray.length) {
            return res
                .status(404)
                .json({
                    site: fileArray,
                    success: false,
                    error: "",
                    message: "Document not found ",
                });
        }
        return res
            .status(200)
            .json({
                site: fileArray,
                success: true,
                error: "",
                message: "Document found successfully",
            });
    } catch (error) {
        return res
            .status(500)
            .json({
                site: null,
                success: false,
                error: `Error: ${error}`,
                message: "",
            });
    }
};

module.exports = GetSiteDocumentController;
