const materialModels = require("@/models/organization/main/material/material.modal");
const deleteMaterial = async(req,res)=>{
    try {
        let {organization,materialId} = req.query
        if(!materialId){
            return res.status(404).json({
                success: false,
                Error: "",
                message: "Material ID is required",
              });
        }
        let inventoryDetails
        inventoryDetails= await materialModels.findById(materialId)
        if(!inventoryDetails){
            return res.status(404).json({
                success: true,
                Error: "",
                message: "Material Not Found ",
              });
        }
        inventoryDetails= await materialModels.findByIdAndDelete(materialId)
        if(inventoryDetails){
            return res.status(200).json({
                success: true,
                Error: "",
                message: "Material deleted Successfully !",
              });
        }

        return res.status(404).json({
            success: false,
            Error: "",
            message: "Material Not deleted ",
          });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            Error: error,
            message: "Failed to delete Material.",
          });
    }
}

module.exports = deleteMaterial