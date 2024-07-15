const Issues = require("@/models/organization/site/siteIssues/siteIssues.model");

const UpdateIssuesController = async (req, res) => {
  const { organization, site ,siteIssueId} = req.query;
  try {
    const IssuesData = req.body;
    if (!siteIssueId) {
        return res.status(404).json({
          success: false,
          message: "Issue ID is required",
        });
      }
   
    const issueData = await Issues.findByIdAndUpdate(siteIssueId,IssuesData,{ runValidators: true });

    if (issueData) {
      return res.status(200).json({
        success: true,
        message: "Issue Updated successfully.",
      });
    } else {
      return res.status(500).json({
        success: false,
        msg: "Failed to Updated issue .",
      });
    }
    
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Failed to update site issue.",
      error: err.message,
    });
  }
};

module.exports = UpdateIssuesController;
