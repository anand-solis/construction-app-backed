const TaskAttachment = require("@/models/organization/site/task/taskAttachment.model");
const getStorageFile = require("@/utils/connections/storage/getStorageFile");

const GetAllTaskAttachmentController = async (req, res) => {
    const { organization, site, floor, task } = req.query;

    try {
        const taskAttachments = await TaskAttachment.find({
            organization: organization,
            site: site,
            floor: floor,
            task: task
        })
        .select("attachment")
        .populate({
            path: "attachment",
            select: "url"
        });

        taskAttachments.length > 0 && await Promise.all(taskAttachments.map(async (taskAttachment) => {
            if (taskAttachment?.attachment?.url) {
                const profile = await getStorageFile(taskAttachment.attachment.url);
                taskAttachment.attachment.url = profile.file;
            }
        }));

        return res.status(200).json({ taskAttachments: taskAttachments, success: true, error: "", message: "Task attachments successfully fetched." });
    } catch (error) {
        return res.status(500).json({ taskAttachments: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAllTaskAttachmentController;