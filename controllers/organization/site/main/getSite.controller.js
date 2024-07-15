const Site = require("@/models/organization/site/main/site.model");
const getStorageFile = require("@/utils/connections/storage/getStorageFile");

const GetAllSiteController = async (req, res) => {
  const { organization, site } = req.query;
  console.log(organization, site);

  try {
    const siteDetails = await Site.findOne({
      _id: site,
      organization: organization,
    })
      .select("name startDate endDate profile")
      .populate("profile", { url: 1, _id: 0 });

    if (siteDetails && siteDetails.profile) {
      const profile = await getStorageFile(siteDetails.profile.url);
      siteDetails.profile.url = profile.file;
    } else {
      console.log("Site details or profile not found.");
    }
    // const profile = await getStorageFile(siteDetails.profile.url);
    // siteDetails.profile.url = profile.file;

    return res
      .status(200)
      .json({
        site: siteDetails,
        success: true,
        error: "",
        message: "Site fetched successfully.",
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

module.exports = GetAllSiteController;
