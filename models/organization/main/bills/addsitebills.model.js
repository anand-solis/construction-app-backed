const mongoose = require("mongoose");

const SiteBillsSchema = mongoose.Schema({
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
  budget: {
    type: Number,
    required: [true, "Site Budget Required."],
  },
});


module.exports =  mongoose.model("SiteBills", SiteBillsSchema);
