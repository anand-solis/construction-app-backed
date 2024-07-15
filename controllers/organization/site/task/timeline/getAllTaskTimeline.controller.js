const TaskTimeline = require("@/models/organization/site/task/taskTimeline.model");

const GetAllTaskTimelineController = async (req, res) => {
    const { organization, site, floor, task } = req.query;

    try {
        const taskTimelines = await TaskTimeline.find({
            organization: organization,
            site: site,
            floor: floor,
            task: task
        })
        .select("progress createdAt createdBy")
        .populate({
            path: "createdBy",
            select: "name"
        });

        return res.status(200).json({ taskTimelines: taskTimelines, success: true, error: "", message: "Task timelines fetched successfully." });
    } catch (error) {
        return res.status(500).json({ taskTimelines: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAllTaskTimelineController;