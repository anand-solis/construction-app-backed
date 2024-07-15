const Labour = require("@/models/organization/site/attendance/labour/labour.model");

const DeleteLabourController = async (req, res) => {
    const { organization, site } = req.query;
    const { id } = req.params;

    try {
        // Assuming you have a unique identifier for each labour entry, you can use findByIdAndDelete
        const deletedLabour = await Labour.findByIdAndDelete(id);

        if (!deletedLabour) {
            return res.status(404).json({
                success: false,
                message: "Labour entry not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Labour entry deleted successfully."
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Failed to delete labour entry."
        });
    }
};

module.exports = DeleteLabourController;
