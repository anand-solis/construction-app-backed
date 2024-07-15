const Task = require("@/models/organization/site/task/task.model");
const TaskMember = require("@/models/organization/site/task/taskMember.model");

const taskMiddleware = async (req, res, next) => {
    const { organization, site, task } = req.query;

    try {
        const taskDetails = await Task.findOne({ _id: task, site: site, organization: organization }).select("_id");

        if (taskDetails?._id) {
            const MemberDetails = await TaskMember
                .findOne({ organization: organization, site: site, task: taskDetails?._id })
                .select("_id member")
                .populate({
                    path: "member",
                    select: "member",
                    populate: {
                        path: "member",
                        match: {
                            user: req.user._id
                        }
                    }
                });
    
            if (MemberDetails?._id && MemberDetails?.member?.member) {
                next();
            }
            else {
                return res.status(409).json({ success: false, error: "You are not a member of this task." });
            }
        }
        else {
            return res.status(409).json({ success: false, error: "This task not exist in your organization." });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}` });
    }
}

module.exports = taskMiddleware;