const WorkCategory = require("@/models/organization/main/workCategory.model");

const GetAllWorkCategoriesController = async (req, res) => {
    const { organization } = req.query;

    try {
        const workCategories = await WorkCategory.find({ $or: [{ organization: "" }, { organization: organization }] }).select("name");

        return res.status(200).json({ workCategories: workCategories, success: true, error: "", message: "Work Categories fetched successfully." });
    } catch (error) {
        return res.status(500).json({ workCategories: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAllWorkCategoriesController;