const ExpenseBill = require("@/models/organization/main/bills/addExpense.Bill.model");

const getExpenseBill = async (req, res) => {
  const { id, organization } = req.query;
  try {
    const data = await ExpenseBill.find({
      expenseId: id,
    }).populate({
      path:"expenseId",
      select:""
    });
    console.log(data);
    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      message: "Failed to get Site Expenses.",
    });
  }
};

module.exports = getExpenseBill;
