const WorkCategory = require("@/models/organization/main/workCategory.model");

const GetAllAppWorkCategoriesController = async (req, res) => {
    try {
        const workCategories = await WorkCategory
            .find({})
            .select("name createdBy organization")
            .populate({
                path: "createdBy",
                select: "name email.address phone.number"
            });

        return res.status(200).json({ workCategories: workCategories, success: true, error: "", message: "Work Categories fetched successfully." });
    } catch (error) {
        return res.status(500).json({ workCategories: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAllAppWorkCategoriesController;