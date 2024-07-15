const TaskMember = require("@/models/organization/site/task/taskMember.model");

const GetAllAddedTaskMemberController = async (req, res) => {
    const { organization, site, floor, task } = req.query;

    try {
        const taskMembers = await TaskMember
            .find({ organization: organization, site: site, floor: floor, task: task })
            .select("member")
            .populate({
                path: "member",
                select: "member",
                populate: {
                    path: "member",
                    select: "user",
                    populate: [
                        {
                            path: "user",
                            select: ["name", "phone.number", "email.address"]
                        }
                    ]
                }
            })

        let result = [];
        taskMembers.map(member => {
            if(member?.member?.member?.user?._id){
                result.push({
                    taskMemberId: member?._id,
                    siteMemberId: member?.member?._id,
                    userId: member?.member?.member?.user?._id || "",
                    name: member?.member?.member?.user?.name || "",
                    email: member?.member?.member?.user?.email?.address || "",
                    phone: member?.member?.member?.user?.phone?.number || ""
                })
            }
        })

        return res.status(200).json({ taskMembers: result, success: true, error: "", message: "Task members fetched successfully." });

    } catch (error) {
        return res.status(500).json({ taskMembers: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAllAddedTaskMemberController;