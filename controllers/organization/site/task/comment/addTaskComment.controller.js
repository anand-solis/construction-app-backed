const TaskComment = require("@/models/organization/site/task/taskComment.model");

const AddTaskCommentController = async (req, res) => {
    const { comment } = req.body;
    const { organization, site, floor, task } = req.query;

    try {
        await TaskComment.create({
            organization: organization,
            site: site,
            floor: floor,
            task: task,
            comment: comment,
            createdBy: req?.user?._id
        });

        return res.status(201).json({ success: true, error: "", message: "Task comment successfully created." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = AddTaskCommentController;