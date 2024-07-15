const Site = require("@/models/organization/site/main/site.model");
const { default: mongoose } = require("mongoose");
const addSiteMembers = async (req, res) => {
  const { organization, site } = req.query;
  console.log(organization, site);

  try {
    let payload = req.body
    let siteDetails
    let user = req.user
    let userId = user?._id?.toString()
    let membersId = payload?.membersId?.length ? payload?.membersId : []
    if (!membersId.length) {

      return res
        .status(400)
        .json({
          success: false,
          error: "",
          message: "Site Members is Required",
        });
    }
    siteDetails = await Site.findById(site)
    let preMeberData = siteDetails?.siteMember?.length ? siteDetails?.siteMember : []
    let allMeberData = []
    for (let i = 0; i < preMeberData.length; i++) {
      allMeberData.push(preMeberData[i]?.toString())
    }
    if(!allMeberData.includes(userId)){
      allMeberData.push(userId)
    }
    for (let i = 0; i < membersId.length; i++) {
      if (!allMeberData.includes(membersId[i])) {
        allMeberData.push(membersId[i])
      }
    }
    allMeberData = allMeberData?.map((id) => new mongoose.Types.ObjectId(id))
    siteDetails = await Site.findOneAndUpdate({
      _id: site,
      organization: organization,
    },
      { siteMember: allMeberData }
    )

    if (!siteDetails) {
      return res
        .status(404)
        .json({
          site: siteDetails,
          success: true,
          error: "",
          message: "Site Member not Add",
        });
    }
    return res
      .status(200)
      .json({
        site: siteDetails,
        success: true,
        error: "",
        message: "Site Members Added successfully.",
      });
  } catch (error) {
    console.log(error)
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

module.exports = addSiteMembers;
