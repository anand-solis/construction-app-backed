const SiteBillsModel = require("@/models/organization/main/bills/addsitebills.model");

const addsiteBillsController = async (req, res) => {
  const { organization } = req.query;
  const { site, budget } = req.body;
  try {
    const data = {
      organization: organization,
      site: site,
      budget: budget,
    };
    const addedSiteBill = await SiteBillsModel.create(data);
    if (!addedSiteBill) {
      return res.status(500).json({
        success: false,
        message: "Failed to add Site Budget. Send proper payload.",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Site Budget Added Successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
      message: "Failed to add Site Budget",
    });
  }
};

const getsiteBillsController = async (req, res) => {
  const { organization } = req.query;
  try {
    const billsData = await SiteBillsModel.find({
      organization: organization,
    }).populate({
      path: "site",
      select: " _id name startDate endDate ",
    });

    if (billsData) {
      return res.status(200).json({
        success: true,
        data: billsData,
        message: "Site Bills fetch Successfully.",
      });
    }
    return res.status(500).json({
      success: false,
      error: err,
      message: "Failed to Get Site Bills details.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      message: "Failed to get Site Bills details.",
    });
  }
};

const updateSiteBillsController = async (req, res) => {
  const { organization, site } = req.query;
  const { id } = req.params;
  const { budget } = req.body;
  try {
    const siteUpdate = await SiteBillsModel.findByIdAndUpdate(
      { _id: id },
      { budget },
      { new: true }
    );
    if (!siteUpdate) {
      return res.status(400).json({
        message: "Site Budget is not Updated.",
      });
    }
    return res.status(200).json({
      data: siteUpdate,
      success: true,
      message: "Site Budget updated Successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      message: "Failed to Updated Site Budget.",
    });
  }
};
const deleteSiteBillsController = async (req, res) => {
  const { organization,siteBillId } = req.query;
  try {
    if(!siteBillId){
      return res.status(404).json({
        success: false,
        error: "",
        meassage: "Site Budget id is required",
      });
    }
    const billData = await SiteBillsModel.findByIdAndDelete(
      siteBillId
      
    );
    if (!billData) {
      return res.status(500).json({
        success: false,
        error: "",
        meassage: "Failed to  Delete Site Budget.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Site Budget Delete Successfully.",
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      error: err,
      meassage: "Failed to  Delete Site Budget.",
    });
  }
};
module.exports = {
  addsiteBillsController,
  getsiteBillsController,
  updateSiteBillsController,
  deleteSiteBillsController
};
