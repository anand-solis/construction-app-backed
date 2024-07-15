const SiteUpload = require("@/models/organization/site/main/siteUpload.model");
const File = require("@/models/file/file.model");

const RemoveSiteUploadController = async (req, res) => {
    const { id } = req.params;
    const { organization, site } = req.query;

    try {
        const deletedFile = await SiteUpload.findOne({
            _id: id,
            organization: organization,
            site: site
        }).select("attachment");

        if(deletedFile?._id){
            await SiteUpload.deleteOne({
                _id: id,
                organization: organization,
                site: site,
                createdBy: req.user._id
            });
    
            await File.findOneAndUpdate(
                {
                    _id: deletedFile.attachment,
                    organization: organization
                },
                {
                    used: false
                }
            );

            return res.status(200).json({ success: true, error: "", message: "Site upload successfully removed." });
        }
        else{
            return res.status(200).json({ success: true, error: "", message: "Site upload not exist for remove." });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = RemoveSiteUploadController;