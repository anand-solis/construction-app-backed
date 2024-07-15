const TaskComment = require("@/models/organization/site/task/taskComment.model");

const GetAllTaskCommentController = async (req, res) => {
    const { organization, site, floor, task } = req.query;

    try {
        const taskComment = await TaskComment.find({
            organization: organization,
            site: site,
            floor: floor,
            task: task
        }).select("comment");

        return res.status(200).json({ taskComment: taskComment, success: true, error: "", message: "Task comments fetched successfully." });
    } catch (error) {
        return res.status(500).json({ taskComment: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAllTaskCommentController;