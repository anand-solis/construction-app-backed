const TaskIssue = require("@/models/organization/site/task/taskIssue.model");

const GetAllTaskIssueController = async (req, res) => {
    const { organization, site, floor, task } = req.query;

    try {
        const taskIssues = await TaskIssue.find({
            organization: organization,
            site: site,
            floor: floor,
            task: task
        }).select("issue");

        return res.status(200).json({ taskIssues: taskIssues, success: true, error: "", message: "Task issue fetched successfully." });
    } catch (error) {
        return res.status(500).json({ taskIssues: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAllTaskIssueController;