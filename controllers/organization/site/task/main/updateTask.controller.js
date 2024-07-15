const Task = require("@/models/organization/site/task/task.model");

const UpdateTaskController = async (req, res) => {
    const { taskName,taskNumber, description, workCategory, endDate, startDate, expectedCost, totalCost } = req.body;
    const { organization, site, floor, task } = req.query;

    try {
        await Task.findOneAndUpdate(
            {
                _id: task,
                organization: organization,
                site: site,
                floor: floor
            },
            {
                taskNumber: taskNumber,
                taskName: taskName,
                description: description,
                workCategory: workCategory,
                endDate: endDate,
                startDate: startDate,
                expectedCost: expectedCost,
                totalCost: totalCost
            }
        );

        return res.status(200).json({ success: true, error: "", message: "Task successfully updated." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = UpdateTaskController;