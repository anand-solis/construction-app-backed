const WorkCategoryModels = require("@/models/organization/main/workCategory.model");

const UpdateAppWorkCategoryController = async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    try {
        const { organization } = req.query;
        let workCategory = await WorkCategoryModels.find({
            name: name,
            organization: organization
        })
        if (workCategory.length) {
            return res.status(409).json({ success: false, error: "", message: "Work category already exists for this organization." });
        }
        await WorkCategoryModels.findOneAndUpdate(
            { _id: id },
            { name: name }
        )

        return res.status(200).json({ success: true, error: "", message: "Work Category updated successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = UpdateAppWorkCategoryController;