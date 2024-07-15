const Issues = require("@/models/organization/site/siteIssues/siteIssues.model");
const uploadStorageFile = require("@/utils/connections/storage/uploadStorageFile");

const UpdateIssuesStatusController = async (req, res) => {
  const { organization, site ,siteIssueId} = req.query;
  try {
    
    if (!siteIssueId) {
      return res.status(404).json({
        success: true,
        message: "Issue ID is required",
      });
    }
    const response = await uploadStorageFile(req, ["image"]);
    const IssuesData = {};

    if (response?.fields?.assignUser?.[0] !== undefined) IssuesData.assignUser = response.fields.assignUser[0];
    if (response?.fields?.reason?.[0] !== undefined) IssuesData.reason = response.fields.reason[0];
    if (response?.fields?.dueDate?.[0] !== undefined) IssuesData.dueDate = response.fields.dueDate[0];
    if (response?.fields?.floor?.[0] !== undefined) IssuesData.floor = response.fields.floor[0];
    if (response?.fields?.workCategory?.[0] !== undefined) IssuesData.workCategory = response.fields.workCategory[0];
    if (response?.fields?.status?.[0] !== undefined) IssuesData.status = response.fields.status[0];

    if (response.success) {
      IssuesData["Files"] = response?.file
    }
    const issueData = await Issues.findByIdAndUpdate(siteIssueId,IssuesData);

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

module.exports = UpdateIssuesStatusController;
