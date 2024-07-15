const Issues = require("@/models/organization/site/siteIssues/siteIssues.model");
const { default: mongoose } = require("mongoose");

const GetIssuesController = async (req, res) => {
  const { organization, site ,status} = req.query;

  try {
    if(!status){
      return res.status(200).json({
        issueData: [],
        success: false,
        message: "Issue status is  Required.",
      });
    }
    const issueData = await Issues.find({site:new mongoose.Types.ObjectId(site),status:status}).populate({
      path: "assignUser",
      select: "id name email phone "
    }).populate({
      path: "floor",
      select: "name "
    }).
      populate({
        path: "workCategory",
        select: "name "
      }).
      populate({
        path: "createdBy",
        select: "name "
      })
      ;

    if (issueData.length) {
      return res.status(200).json({
        issueData: issueData,
        success: true,
        message: "Issue Get successfully.",
      });
    } 

      return res.status(404).json({
        success: true,
        issueData:[],
        message: "Issue not Found",
      });
    
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Failed to Get issue.",
      error: err.message,
    });
  }
};

module.exports = GetIssuesController;
