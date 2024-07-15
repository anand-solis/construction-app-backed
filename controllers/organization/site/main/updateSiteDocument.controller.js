const uploadStorageFile = require("@/utils/connections/storage/uploadStorageFile");
const File = require("@/models/file/file.model");
const Site = require("@/models/organization/site/main/site.model");
const { default: mongoose } = require("mongoose");

const UpdateSiteDocumentController = async (req, res) => {
    const { organization, site } = req.query;

    try {
        let user = req.user
        let userId = user?._id
        const response = await uploadStorageFile(req, ["image"]);

        if (response.success) {
            let siteDetails = await Site.findById(site)
            siteDetails = siteDetails?.toObject()
            let siteDocuments = siteDetails?.siteDocuments?.length ? siteDetails.siteDocuments : [];
            siteDocuments.push({
                file: new mongoose.Types.ObjectId(response.file),
                userId: userId
            })
            siteDocuments = await Site.findOneAndUpdate(
                {
                    _id: site,
                    organization: organization
                },
                {
                    siteDocuments: siteDocuments
                }
            )
            return res.status(200).json({ success: true, error: "", message: "Site document updated successfully." });

        }


        return res.status(404).json({ success: false, error: "", message: "Site document not updated " });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = UpdateSiteDocumentController;