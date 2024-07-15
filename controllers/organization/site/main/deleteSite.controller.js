const Site = require("@/models/organization/site/main/site.model");

const deleteSiteController = async (req, res) => {

    const { organization ,site} = req.query;

    try {
        const siteDetailse = await Site.findByIdAndDelete(site)
        if(siteDetailse){
            return res.status(200).json({ success: true, error: "", message: "Site Deleted Successfully !" });
        }
        return res.status(404).json({ success: false, error: "", message: "Site Not Deleted" });


    } catch (error) {
        console.log(error)
        return res.status(500).json({ site: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = deleteSiteController;