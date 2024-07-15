const vendorDetailsSchema = require("@/models/organization/main/vendor/vendor.modal");
const financialDetails = require("@/models/organization/main/vendor/financialdetails");
const rootVender = require("@/models/organization/main/vendor/rootVender.modal");

const getAllvendors = async (req, res) => {
  const { organization } = req.query;

  try {
    const vendors = await rootVender.find({ organization }).populate("vendor").populate("finaicialdetails");
    return res.status(200).json({
      success: true,
      data: vendors,
      message: "Vendor Fetched Successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      message: "Error in fetch All Vendors Details.",
    });
  }
};

const GetVendorByOrganization = async (req, res) => {
  const { organization, rootvendorId } = req.query;
  try {
    const vendorByOrg = await rootVender
      .find({ _id: rootvendorId })
      .populate("uploadProof")
      .populate("vendor")
      .populate("finaicialdetails")
      .populate("termsAndCondition");
    console.log(vendorByOrg);
    return res.status(200).json({
      success: true,
      data: vendorByOrg,
      message: "Vendor By Organization Fetched Successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      message: "Error in fetch By Org Vendors Details.",
    });
  }
};

module.exports = { getAllvendors, GetVendorByOrganization };
