const WorkCategory = require("@/models/organization/main/workCategory.model");

const RemoveAppWorkCategoryController = async (req, res) => {
    const { id } = req.params;

    try {
        await WorkCategory.deleteOne({ _id: id });

        return res.status(200).json({ success: true, error: "", message: "Work Category removed successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = RemoveAppWorkCategoryController;