const mongoose = require("mongoose");

const SiteExpensesSchema = mongoose.Schema({
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
  name: {
    type: String,
    required: [true, "Expensessss Name is required."],
  },
});

module.exports = mongoose.model("SiteExpenses", SiteExpensesSchema);
