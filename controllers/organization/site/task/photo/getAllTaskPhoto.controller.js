const TaskPhoto = require("@/models/organization/site/task/taskPhoto.model");
const getStorageFile = require("@/utils/connections/storage/getStorageFile");

const GetAllTaskPhotoController = async (req, res) => {
    const { organization, site, floor, task } = req.query;

    try {
        const taskPhotos = await TaskPhoto.find({
            organization: organization,
            site: site,
            floor: floor,
            task: task
        })
        .select("photo")
        .populate({
            path: "photo",
            select: "url"
        });

        taskPhotos.length > 0 && await Promise.all(taskPhotos.map(async (taskPhoto) => {
            if (taskPhoto?.photo?.url) {
                const profile = await getStorageFile(taskPhoto.photo.url);
                taskPhoto.photo.url = profile.file;
            }
        }));

        return res.status(200).json({ taskPhotos: taskPhotos, success: true, error: "", message: "Task photos successfully fetched." });
    } catch (error) {
        return res.status(500).json({ taskPhotos: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAllTaskPhotoController;