const Task = require("@/models/organization/site/task/task.model");

const GetTaskController = async (req, res) => {
    const { organization, site, task } = req.query;

    try {
        const tasks = await Task
            .find({ _id: task, organization: organization, site: site })
            .select("taskName description workCategory endDate startDate expectedCost totalCost")
            .sort({ createdAt: -1 })
            .populate({
                path: "workCategory",
                select: "name"
            });

        return res.status(200).json({ tasks: tasks, success: true, error: "", message: "Task fetched successfully." });

    } catch (error) {
        return res.status(500).json({ tasks: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetTaskController;