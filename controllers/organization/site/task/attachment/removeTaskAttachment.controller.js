const TaskAttachment = require("@/models/organization/site/task/taskAttachment.model");
const File = require("@/models/file/file.model");

const RemoveTaskAttachmentController = async (req, res) => {
    const { id } = req.params;
    const { organization, site, floor, task } = req.query;

    try {
        const deletedFile = await TaskAttachment.findOne({
            _id: id,
            organization: organization,
            site: site,
            floor: floor,
            task: task
        }).select("attachment");

        if(deletedFile?._id){
            await TaskAttachment.deleteOne({
                _id: id,
                organization: organization,
                site: site,
                floor: floor,
                task: task,
                createdBy: req.user._id
            });
    
            await File.findOneAndUpdate(
                {
                    _id: deletedFile.attachment,
                    organization: organization
                },
                {
                    used: false
                }
            );

            return res.status(200).json({ success: true, error: "", message: "Task attachment successfully removed." });
        }
        else{
            return res.status(200).json({ success: true, error: "", message: "Task attachment not exist for remove." });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = RemoveTaskAttachmentController;