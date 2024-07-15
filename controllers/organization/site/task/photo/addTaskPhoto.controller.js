const TaskPhoto = require("@/models/organization/site/task/taskPhoto.model");
const uploadStorageFile = require("@/utils/connections/storage/uploadStorageFile");

const AddTaskPhotoController = async (req, res) => {
    const { organization, site, floor, task } = req.query;

    try {
        const response = await uploadStorageFile(req, ["image"]);

        if (response?.success) {
            await TaskPhoto.create({
                organization: organization,
                site: site,
                floor: floor,
                task: task,
                photo: response.file,
                createdBy: req.user._id
            })

            return res.status(201).json({ success: true, error: "", message: "Task photo successfully created." });
        }
        else {
            return res.status(200).json({ success: response?.success, error: response?.error, message: response?.message });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = AddTaskPhotoController;