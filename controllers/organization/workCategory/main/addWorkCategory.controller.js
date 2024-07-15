const WorkCategory = require("@/models/organization/main/workCategory.model");


const AddWorkCategoryController = async (req, res) => {
    const { organization } = req.query;
    const { name } = req.body;

    try {
        let workCategory = await WorkCategory.find({
            name:name,
            organization:organization
        })
        if(workCategory.length){
            return res.status(409).json({ success: false, error: "", message: "Work category already exists for this organization." });
        }
        await WorkCategory.create({
            organization: organization,
            name: name,
            createdBy: req.user._id
        });

        return res.status(201).json({ success: true, error: "", message: "Work Category added successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = AddWorkCategoryController;