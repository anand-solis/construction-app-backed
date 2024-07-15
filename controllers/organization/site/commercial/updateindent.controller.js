const Indent = require("@/models/organization/site/commercial/indent.model");

const updateIndent = async (req, res) => {
  const { organization, site } = req.query;
  const { id } = req.params;
  const newData = req.body;

  try {
    const data = await Indent.findByIdAndUpdate({ _id: id }, newData, {
      new: true,
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Indent not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Indent updated successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to update Indent.",
    });
  }
};

module.exports = updateIndent;
