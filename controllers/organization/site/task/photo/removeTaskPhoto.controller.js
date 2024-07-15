const TaskPhoto = require("@/models/organization/site/task/taskPhoto.model");
const File = require("@/models/file/file.model");

const RemoveTaskPhotoController = async (req, res) => {
    const { id } = req.params;
    const { organization, site, floor, task } = req.query;

    try {
        const deletedFile = await TaskPhoto.findOne({
            _id: id,
            organization: organization,
            site: site,
            floor: floor,
            task: task
        }).select("photo");

        if(deletedFile?._id){
            await TaskPhoto.deleteOne({
                _id: id,
                organization: organization,
                site: site,
                floor: floor,
                task: task,
                createdBy: req.user._id
            });
    
            await File.findOneAndUpdate(
                {
                    _id: deletedFile.photo,
                    organization: organization
                },
                {
                    used: false
                }
            );

            return res.status(200).json({ success: true, error: "", message: "Task photo successfully removed." });
        }
        else{
            return res.status(200).json({ success: true, error: "", message: "Task photo not exist for remove." });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = RemoveTaskPhotoController;