const SiteBills = require("@/models/organization/main/bills/addsitebills.model");
const ExpenseBill = require("@/models/organization/main/bills/addExpense.Bill.model");

const calculateBills = async (req, res) => {
  const { organization, site } = req.query;

  try {
    const fetchsite = await SiteBills.find({ site: site });
    const siteBills = fetchsite?.[0].budget;
    
    const fetchExpense = await ExpenseBill.find({ site: site });
    const expenseBill = fetchExpense.map((item) => item.totalAmount);
    const totalExpense = expenseBill.reduce(
      (total, amount) => total + amount,
      0
    );

    const overAllbudget = totalExpense;

    if (!siteBills) {
      return res.status(404).json({
        success: false,
        message: "Calculated Budget not found for the provided site.",
      });
    }
    return res.status(200).json({
      siteBills: siteBills,
      overAllbudget: overAllbudget, 
      success: true,
      message: "Calculated Budget Get successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      message: "Failed to get Calculated Budget.",
    });
  }
};

module.exports = calculateBills;
