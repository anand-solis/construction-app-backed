const materialSchema = require("@/models/organization/main/material/material.modal");

const uploadImages = async (req, res) => {
  const { organization, id } = req.query;
  try {
    const response = await uploadStorageFile(req, ["image"]);

    if (response.success) {
      const prev = await materialSchema.findOne({ _id: id }).select("photo");

      if (prev?.photo) {
        await File.findOneAndUpdate(
          { organization: organization, _id: prev.profile },
          { used: false }
        );
      }

      await Organization.findOneAndUpdate(
        {
          _id: organization,
        },
        {
          profile: response.file,
        }
      );
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "failed to upload Files.",
    });
  }
};

module.exports = uploadImages;
