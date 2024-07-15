const BOQ = require("@/models/organization/main/boq/boq.model");

const AddBOQ = async (req, res) => {
  const { organization } = req.query;
  const data = req.body;

  try {
    const addbillofquantity = await BOQ.create({
      ...data,
      organization: organization,
    });
    console.log(addbillofquantity);
    if (!addbillofquantity) {
      return res.status(400).json({
        success: true,
        message: "Failed to Add BOQfff .",
      });
    }

    return res.status(201).json({
      success: true,
      message: "BOQ Added Successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      message: "Failed to Add BOQ.",
    });
  }
};
const GetBOQ = async (req, res) => {
  const { organization } = req.query;

  try {
    const Getbillofquantity = await BOQ.find({
      organization: organization,
    }).populate({
      path: "materialName",
      select: "",
    });

    if (!Getbillofquantity) {
      return res.status(400).json({
        success: true,
        message: "Failed to Get BOQ .",
      });
    }

    return res.status(200).json({
      data: Getbillofquantity,
      success: true,
      message: "BOQ Get Successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      message: "Failed to Get BOQ.",
    });
  }
};
const UpdateBOQ = async (req, res) => {
  const { organization } = req.query;
  const { data } = req.body;
  const { id } = req.params;

  try {
    const Updatebillofquantity = await BOQ.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });

    if (!Updatebillofquantity) {
      return res.status(400).json({
        success: true,
        message: "Failed to Update BOQ .",
      });
    }

    return res.status(200).json({
      data: Updatebillofquantity,
      success: true,
      message: "BOQ Updated Successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      message: "Failed to Update BOQ.",
    });
  }
};

module.exports = { AddBOQ, GetBOQ, UpdateBOQ };
