const SiteMember = require("@/models/organization/site/main/siteMember.model");
const TaskMember = require("@/models/organization/site/task/taskMember.model");

const AddTaskMemberController = async (req, res) => {
    const { members } = req.body;
    const { organization, site, floor, task } = req.query;

    try {
        if (members) {
            await Promise.all(members.map(async (member) => {
                try {
                    const siteMember = await SiteMember
                        .findOne({ _id: member._id, organization: organization })
                        .select("_id");

                    if (siteMember?._id) {
                        const check = await TaskMember
                            .findOne({
                                organization: organization,
                                site: site,
                                floor: floor,
                                task: task,
                                member: member._id
                            })
                            .select("_id");

                        if (!check?._id) {
                            await TaskMember.create({
                                organization: organization,
                                site: site,
                                floor: floor,
                                task: task,
                                member: member._id,
                                isCreator: false
                            });
                        }
                    }
                } catch (error) {
                    return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
                }
            }));

            return res.status(201).json({ success: true, error: "", message: "All members added successfully in this task." });
        } else {
            return res.status(409).json({ success: false, error: "No members provided in your given list.", message: "" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = AddTaskMemberController;