const Indent = require("@/models/organization/site/commercial/indent.model");

const GetAllIndents = async (req, res) => {
  const { organization, site } = req.query;

  try {
    const Indentdata = await Indent.find({ organization: organization })
      .populate({
        path: "site",
        select: "id name ",
      })
      .populate({
        path: "materialId.material",
        select: " -_id materialName brandName uom unitCost description ",
      })
      .populate({ path: "purchaseOrder", select: "" })
      .populate({ path: "createdBy", select: "-_id email phone name " })
      .populate({ path: "assignUser", select: "-_id email phone name" });
    return res.status(200).json({
      success: true,
      data: Indentdata,
      message: "Indent Data Get Successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      Error: err,
      message: "Failed to get Indent.",
    });
  }
};

module.exports = GetAllIndents;
