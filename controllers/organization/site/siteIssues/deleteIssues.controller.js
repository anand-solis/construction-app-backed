const Issues = require("@/models/organization/site/siteIssues/siteIssues.model");

const deleteIssuesController = async (req, res) => {
  try {
    const { organization, site ,sitIssueId} = req.query;
    let issueData
    if(!sitIssueId){
        return res.status(404).json({
            success: false,
            Error: "",
            message: "Site Issue ID is required",
          });
    }
    issueData= await Issues.findById(sitIssueId)
    if(!issueData){
        return res.status(404).json({
            success: false,
            Error: "",
            message: "Site Issue Not Found ",
          });
    }
    issueData= await Issues.findByIdAndDelete(sitIssueId)
   
    
    if (issueData) {
      return res.status(200).json({
        success: true,
        message: "Site Issue delete successfully.",
      });
    } else {
      return res.status(500).json({
        success: false,
        msg: "Failed to Site Issue deletion .",
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      msg: "Failed to Site Issue deletion .",
      error: err.message,
    });
  }
};

module.exports = deleteIssuesController;
