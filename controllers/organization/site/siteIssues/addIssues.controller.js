const Issues = require("@/models/organization/site/siteIssues/siteIssues.model");
const uploadStorageFile = require("@/utils/connections/storage/uploadStorageFile");

const RaiseIssuesController = async (req, res) => {
  try {
    const { organization, site } = req.query;
    const data = req.body;
    let userId = req.user?._id
    const IssuesData = { ...data, organization: organization, site: site, createdBy: userId };
    const response = await uploadStorageFile(req, ["image"]);

    if (response?.fields?.assignUser !== undefined) IssuesData.assignUser = response.fields.assignUser;
    if (response?.fields?.reason?.[0] !== undefined) IssuesData.reason = response.fields.reason[0];
    if (response?.fields?.dueDate?.[0] !== undefined) IssuesData.dueDate = response.fields.dueDate[0];
    if (response?.fields?.floor?.[0] !== undefined) IssuesData.floor = response.fields.floor[0];
    if (response?.fields?.workCategory?.[0] !== undefined) IssuesData.workCategory = response.fields.workCategory[0];
    if (response?.fields?.status?.[0] !== undefined) IssuesData.status = response.fields.status[0];
    if (response?.fields?.issueTitle?.[0] !== undefined) IssuesData.issueTitle = response.fields.issueTitle[0];


    if (response.success) {
      IssuesData["Files"] = response?.file
    }
    const issueData = await Issues.create(IssuesData);

    if (issueData) {
      return res.status(200).json({
        success: true,
        message: "Issue raised successfully.",
      });
    } else {
      return res.status(500).json({
        success: false,
        msg: "Failed to raise issue .",
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      msg: "Failed to raise issue.",
      error: err.message,
    });
  }
};

module.exports = RaiseIssuesController;
