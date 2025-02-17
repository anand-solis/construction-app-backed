const TaskComment = require("@/models/organization/site/task/taskComment.model");

const RemoveTaskCommentController = async (req, res) => {
    const { id } = req.params;
    const { organization, site, floor, task } = req.query;

    try {
        await TaskComment.deleteOne({
            _id: id,
            organization: organization,
            site: site,
            floor: floor,
            task: task,
            createdBy: req.user._id
        });

        return res.status(200).json({ success: true, error: "", message: "Task comment successfully removed." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = RemoveTaskCommentController;