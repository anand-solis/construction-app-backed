const TaskTimeline = require("@/models/organization/site/task/taskTimeline.model");

const RemoveTaskTimelineController = async (req, res) => {
    const { id } = req.params;
    const { organization, site, floor, task } = req.query;

    try {
        await TaskTimeline.deleteOne({
            _id: id,
            organization: organization,
            site: site,
            floor: floor,
            task: task,
            createdBy: req.user._id
        });

        return res.status(200).json({ success: true, error: "", message: "Task timeline successfully removed." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = RemoveTaskTimelineController;