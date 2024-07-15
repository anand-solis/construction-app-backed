const TaskIssue = require("@/models/organization/site/task/taskIssue.model");

const UpdateTaskIssueController = async (req, res) => {
    const { issue } = req.body;
    const { id } = req.params;
    const { organization, site, floor, task } = req.query;

    try {
        await TaskIssue.findOneAndUpdate(
            {
                _id: id,
                organization: organization,
                site: site,
                floor: floor,
                task: task,
                createdBy: req.user._id
            },
            { issue: issue }
        );

        return res.status(200).json({ success: true, error: "", message: "Task issue successfully updated." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = UpdateTaskIssueController;