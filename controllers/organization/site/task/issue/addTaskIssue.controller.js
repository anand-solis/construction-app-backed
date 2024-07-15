const TaskIssue = require("@/models/organization/site/task/taskIssue.model");

const AddTaskIssueController = async (req, res) => {
    const { issue } = req.body;
    const { organization, site, floor, task } = req.query;

    try {
        await TaskIssue.create({
            organization: organization,
            site: site,
            floor: floor,
            task: task,
            issue: issue,
            createdBy: req?.user?._id
        });

        return res.status(201).json({ success: true, error: "", message: "Task issue successfully created." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = AddTaskIssueController;