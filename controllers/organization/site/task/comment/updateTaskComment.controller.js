const TaskComment = require("@/models/organization/site/task/taskComment.model");

const UpdateTaskCommentController = async (req, res) => {
    const { comment } = req.body;
    const { id } = req.params;
    const { organization, site, floor, task } = req.query;

    try {
        await TaskComment.findOneAndUpdate(
            {
                _id: id,
                organization: organization,
                site: site,
                floor: floor,
                task: task,
                createdBy: req.user._id
            },
            { comment: comment }
        );

        return res.status(200).json({ success: true, error: "", message: "Task comment successfully updated." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = UpdateTaskCommentController;