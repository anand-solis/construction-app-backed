const TaskMember = require("@/models/organization/site/task/taskMember.model");
const Task = require("@/models/organization/site/task/task.model");
const SiteMember = require("@/models/organization/site/main/siteMember.model");
const TaskTimeline = require("@/models/organization/site/task/taskTimeline.model");

const GetAllTaskController = async (req, res) => {
    const { organization, site, floor } = req.query;

    try {
        const MemberDetails = await SiteMember
            .findOne({
                organization: organization,
                site: site
            })
            .select("_id member")
            .populate({
                path: "member",
                select: "user",
                match: {
                    user: req.user._id
                }
            });
        console.log(MemberDetails, 'dsfhj')
        console.log(TaskMember, 'TaskMember')
        if (MemberDetails?._id && MemberDetails?.member?.user?._id) {
            let taskMembers = await TaskMember
                .find({ organization: organization, site: site, floor: floor, member: MemberDetails._id })
                .select("task");

            const haveTaskIds = taskMembers.map(member => member.task);

            const tasks = await Task
                .find({ _id: { $in: haveTaskIds }, organization: organization, site: site, floor: floor })
                .select("taskName description workCategory endDate startDate expectedCost totalCost")
                .sort({ createdAt: -1 })
                .populate({
                    path: "workCategory",
                    select: "name"
                });

            const tasksWithProgress = await Promise.all(tasks.map(async task => {
                const taskTimelines = await TaskTimeline
                    .find({ organization: organization, site: site, floor: floor, task: task._id })
                    .select("progress");

                const progressSum = taskTimelines.reduce((sum, timeline) => sum + timeline.progress, 0);

                return {
                    ...task.toObject(),
                    progress: progressSum
                };
            }));

            return res.status(200).json({ tasks: tasksWithProgress, success: true, error: "", message: "Tasks fetched successfully." });
        }
        else {
            return res.status(409).json({ tasks: null, success: false, error: "You are not in this organization.", message: "" });
        }
    } catch (error) {
        return res.status(500).json({ tasks: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAllTaskController;