const TaskTimeline = require("@/models/organization/site/task/taskTimeline.model");

const AddTaskTimelineController = async (req, res) => {
    const { progress } = req.body;
    const { organization, site, floor, task } = req.query;

    try {
        let count = 0;

        const lastProgress = await TaskTimeline.find({
            organization: organization,
            site: site,
            floor: floor,
            task: task
        }).select("progress");

        lastProgress && lastProgress.map(progress => {
            count += progress.progress;
        })

        if(count + progress > 100){
            return res.status(200).json({ success: false, error: `Task timeline can't greater then 100.`, message: "" });
        }
        else {
            await TaskTimeline.create({
                organization: organization,
                site: site,
                floor: floor,
                task: task,
                progress: progress,
                createdBy: req?.user?._id
            });
    
            return res.status(201).json({ success: true, error: "", message: "Task timeline successfully created." });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = AddTaskTimelineController;