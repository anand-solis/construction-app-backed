const vendorPersonalDetails = require("@/models/organization/main/vendor/vendor.modal");
const rootVendor = require("@/models/organization/main/vendor/rootVender.modal");
const vendorFinancialDetails = require("@/models/organization/main/vendor/financialdetails");
const vendorTermsCondition = require("@/models/organization/main/vendor/termsAndCondition");

const updateVendorDetails = async (req, res) => {
  const { organization, vendorId } = req.query;

  try {
    let vendorDetails = await vendorPersonalDetails.find({ _id: vendorId });

    if (!vendorDetails) {
      return res.status(404).json({
        success: false,
        error: "Vendor not found",
        message: "Vendor not found",
      });
    }
    const updatedData = req.body;
    // Update vendor details with the new data
    vendorDetails = await vendorPersonalDetails.findByIdAndUpdate(
      vendorId,
      updatedData,
      { new: true }
    );
    // Update rootVendor if needed
    await rootVendor.findOneAndUpdate(
      { vendor: vendorId, organization: organization },
      { vendor: vendorDetails._id, organization: organization },
      { upsert: true }
    );

    return res.status(200).json({
      data: vendorDetails,
      success: true,
      error: "",
      message: "Vendor Details updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Error: ${error}`,
      message: "Update Vendor error",
    });
  }
};

const updatevendorFinacialDetails = async (req, res) => {
  const { organization, vendorId } = req.query;
  // const vendorId = req.params.vendorId;
  try {
    let vendorDetails = await vendorFinancialDetails.find({ _id: vendorId });
    if (!vendorDetails) {
      return res.status(404).json({
        success: false,
        error: "Vendor not found",
        message: "Vendor not found",
      });
    }

    const updatedData = req.body;
    // Update vendor details with the new data
    vendorDetails = await vendorFinancialDetails.findByIdAndUpdate(
      vendorId,
      updatedData,
      { new: true }
    );

    // Update rootVendor if needed
    await rootVendor.findOneAndUpdate(
      { vendor: vendorId, organization: organization },
      { vendor: vendorDetails._id, organization: organization },
      { upsert: true }
    );

    return res.status(200).json({
      data: vendorDetails,
      success: true,
      error: "",
      message: "Financial Details updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Error: ${error}`,
      message: "Update Vendor error",
    });
  }
};
const updatetermsAndCondition = async (req, res) => {
  const { organization, vendorId } = req.query;
  // const vendorId = req.params.vendorId;
  try {
    let vendorDetails = await vendorTermsCondition.find({ _id: vendorId });
    if (!vendorDetails) {
      return res.status(404).json({
        success: false,
        error: "Vendor not found",
        message: "Vendor not found",
      });
    }

    const updatedData = req.body;
    // Update vendor details with the new data
    vendorDetails = await vendorTermsCondition.findByIdAndUpdate(
      vendorId,
      updatedData,
      { new: true }
    );

    // Update rootVendor if needed
    await rootVendor.findOneAndUpdate(
      { vendor: vendorId, organization: organization },
      { vendor: vendorDetails._id, organization: organization },
      { upsert: true }
    );

    return res.status(200).json({
      data: vendorDetails,
      success: true,
      error: "",
      message: "Terms and Codition Details updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Error: ${error}`,
      message: "Update Vendor error",
    });
  }
};
module.exports = {
  updateVendorDetails,
  updatevendorFinacialDetails,
  updatetermsAndCondition,
};
