const ExpenseBill = require("@/models/organization/main/bills/addExpense.Bill.model");

const addExpenseBillController = async (req, res) => {
  const { organization, site } = req.query;
  const data = req.body;

  const newdata = { ...data, organization: organization, site: site };

  try {
    const data = await ExpenseBill.create(newdata);

    if (data) {
      
      return res.status(201).json({
        success: true,
        data: data,
        message: "Add Details  Successfully.",
      });
    }
    return res.status(500).json({
      success: false,
      error: err,
      message: "Failed to add Details.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      message: "Failed to add Details.",
    });
  }
};

module.exports = addExpenseBillController;
