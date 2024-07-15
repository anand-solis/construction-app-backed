const materialSchema = require("@/models/organization/main/material/material.modal");

const updateMaterial = async (req, res) => {
  const { organization, id } = req.query;
  const updatedData = req.body;

  try {
    const updateMaterialdata = await materialSchema.findByIdAndUpdate(
      { _id: id },
      updatedData,
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Material Updated Successfully.",
      data: updateMaterialdata,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      message: "Failed to update Material.",
    });
  }
};

module.exports = updateMaterial;
