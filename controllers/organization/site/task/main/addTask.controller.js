const Task = require("@/models/organization/site/task/task.model");
const TaskMember = require("@/models/organization/site/task/taskMember.model");
const SiteMember = require("@/models/organization/site/main/siteMember.model");

const AddTaskController = async (req, res) => {
    const { taskName, taskNumber, description, workCategory, endDate, startDate, expectedCost } = req.body;
    const { organization, site, floor } = req.query;

    try {
        const newTask = await Task.create({
            taskName: taskName,
            taskNumber: taskNumber,
            description: description,
            workCategory: workCategory,
            endDate: endDate,
            startDate: startDate,
            expectedCost: expectedCost,
            organization: organization,
            site: site,
            floor: floor,
            createdBy: req?.user?._id
        });

        if (newTask?._id) {
            const member = await SiteMember
                .findOne({ organization: organization, site: site })
                .select("member")
                .populate({
                    path: "member",
                    select: "user",
                    match: {
                        user: req.user._id
                    }
                });

            if (member.member && member?._id) {
                await TaskMember.create({
                    task: newTask?._id,
                    site: site,
                    floor: floor,
                    organization: organization,
                    member: member._id,
                    isCreator: true
                })

                return res.status(201).json({ task: newTask?._id, success: true, error: "", message: "Task successfully created." });
            }
            else {
                return res.status(401).json({ task: null, success: false, error: "You are not a member of this site.", message: "" });
            }
        }
        else {
            return res.status(400).json({ task: null, success: false, error: "Task not created.", message: "" });
        }

    } catch (error) {
        return res.status(500).json({ site: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = AddTaskController;