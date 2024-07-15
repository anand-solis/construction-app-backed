const Site = require("@/models/organization/site/main/site.model");
const { default: mongoose } = require("mongoose");
const getSiteMembers = async (req, res) => {
    const { organization, site } = req.query;
    console.log(organization, site);
  
    try {
       
      const siteDetails = await Site.aggregate([
        {
            $match:{
                _id: new mongoose.Types.ObjectId(site),
                organization: new mongoose.Types.ObjectId(organization),
              }
        },
        {
            '$lookup': {
                'from': 'users', 
                'localField': 'siteMember', 
                'foreignField': '_id', 
                'as': 'siteMemberData'
            }
        },
        {
            $unwind:"$siteMemberData"
        },
        {
          '$lookup': {
              'from': 'members', 
              'localField': 'siteMemberData._id', 
              'foreignField': 'user', 
              'as': 'memberPopulateData'
          }
      },

      {
        '$lookup': {
            'from': 'permissions', 
            'localField': 'memberPopulateData.permission', 
            'foreignField': '_id', 
            'as': 'roleData'
        }
    },

        {
            '$project': {
                'siteMemberData._id': 1, 
                'siteMemberData.name': 1,
                "memberPopulateData.inviteAccepted":1,
                "roleData.name":1,

                _id:0
            }
        }
      ]
    )
       
      if (!siteDetails.length) {
        return res
        .status(404)
        .json({
          site: siteDetails,
          success: true,
          error: "",
          message: "Site Member not Found",
        });
      }
      // const profile = await getStorageFile(siteDetails.profile.url);
      // siteDetails.profile.url = profile.file;
  
      return res
        .status(200)
        .json({
          site: siteDetails,
          success: true,
          error: "",
          message: "Site Members Found successfully.",
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

module.exports = getSiteMembers;
