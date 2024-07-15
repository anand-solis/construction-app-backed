const SiteUpload = require("@/models/organization/site/main/siteUpload.model");
const getStorageFile = require("@/utils/connections/storage/getStorageFile");

const GetAllSiteUploadController = async (req, res) => {
    const { organization, site } = req.query;

    try {
        let siteUploads = await SiteUpload.find({
            organization: organization,
            site: site
        })
            .select("attachment")
            .populate({
                path: "attachment",
                select: "url"
            });

        siteUploads.length > 0 && await Promise.all(siteUploads.map(async (siteUpload) => {
            if (siteUpload?.attachment?.url) {
                const profile = await getStorageFile(siteUpload.attachment.url);
                siteUpload.attachment.url = profile.file;
            }
        }));

        return res.status(200).json({ siteUploads: siteUploads, success: true, error: "", message: "Site uploads successfully fetched." });
    } catch (error) {
        return res.status(500).json({ siteUploads: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAllSiteUploadController;