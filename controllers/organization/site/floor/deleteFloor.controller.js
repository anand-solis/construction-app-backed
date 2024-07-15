const Floor = require("@/models/organization/site/main/floor.model");

const deleteFloorController = async (req, res) => {
    const { floor } = req.query;

    try {
        const organizationDetails = await Floor.findByIdAndDelete(floor)
        if(!organizationDetails){
        return res.status(200).json({ success: false, error: "", message: "Floor not deleted" });

        }

        return res.status(200).json({ success: true, error: "", message: "Floor deleted successfully." });
    } catch (error) {
        console.log(error)
        return res.status(500).json({  success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = deleteFloorController;