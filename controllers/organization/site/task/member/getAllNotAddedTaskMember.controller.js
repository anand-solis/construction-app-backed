const TaskMember = require("@/models/organization/site/task/taskMember.model");
const SiteMember = require("@/models/organization/site/main/siteMember.model");

const GetAllNotAddedTaskMemberController = async (req, res) => {
    const { organization, site, floor, task } = req.query;

    try {
        const siteMembers = await SiteMember
            .find({ organization: organization, site, site })
            .select("member")
            .populate({
                path: "member",
                select: "user",
                populate: {
                    path: "user",
                    select: ["name", "phone.number", "email.address"]
                }
            });

        const taskMembers = await TaskMember
        .find({ organization: organization, site: site, floor: floor, task: task })
        .select("member");

        const taskMembersIds = taskMembers.map(taskMember => taskMember.member.toString());

        const notTaskMembers = siteMembers.filter(member => !taskMembersIds.includes(member._id.toString()));

        let result = [];
        notTaskMembers.map(member => {
            if(member?.member?.user?._id){
                result.push({
                    siteMemberId: member?._id,
                    userId: member?.member?.user?._id || "",
                    name: member?.member?.user?.name || "",
                    email: member?.member?.user?.email?.address || "",
                    phone: member?.member?.user?.phone?.number || ""
                })
            }
        })

        return res.status(200).json({ notTaskMembers: result, success: true, error: "", message: "Not added in task members fetched successfully." });

    } catch (error) {
        return res.status(500).json({ notTaskMembers: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAllNotAddedTaskMemberController;