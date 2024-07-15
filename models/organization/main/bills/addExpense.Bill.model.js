const mongoose = require("mongoose");

const ExpenseBill = mongoose.Schema({
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: [true, "organization required."],
  },
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Site",
    required: [true, "organization required."],
  },
  expenseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SiteExpenses",
    required: [true, "Expense ID  required."],
  },
  title: {
    type: String,
    required: [true, "Expense ID  required."],
  },
  price: {
    type: Number,
    required: [true, "Price   required."],
  },
  quantity: {
    type: Number,
    required: [true, "quantity required."],
  },
  date: {
    type: String,
  },
  totalAmount: {
    type: Number,
    required: [true, "Total Amount required."],
  },
});

module.exports = mongoose.model("ExpenseBill", ExpenseBill);
