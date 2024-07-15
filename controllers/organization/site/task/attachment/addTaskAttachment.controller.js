const TaskAttachment = require("@/models/organization/site/task/taskAttachment.model");
const uploadStorageFile = require("@/utils/connections/storage/uploadStorageFile");

const AddTaskAttachmentController = async (req, res) => {
    const { organization, site, floor, task } = req.query;

    try {
        const response = await uploadStorageFile(req, ["application"]);

        if (response?.success) {
            await TaskAttachment.create({
                organization: organization,
                site: site,
                floor: floor,
                task: task,
                attachment: response.file,
                createdBy: req.user._id
            })

            return res.status(201).json({ success: true, error: "", message: "Task attachment successfully created." });
        }
        else {
            return res.status(200).json({ success: response?.success, error: response?.error, message: response?.message });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = AddTaskAttachmentController;