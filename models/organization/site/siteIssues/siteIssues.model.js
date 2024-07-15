const mongoose = require("mongoose");
const workCategoryModel = require("../../main/workCategory.model");

const IssuesSchema = mongoose.Schema({
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Site",
    required: true,
  },
  issueTitle:{
    type:String
  },
  floor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Floor",
    // required: true,
  },
  workCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WorkCategory",
    // required: true,
  },
  status: {
    type: String,
    enum:["Pending","Resolved"],
    default:"Pending"
  },
  assignUser: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Assign user Id is required."],
    },
  ],
  reason: {
    type: String,
    // required: [true, "Issue Reason  is required."],
  },
  dueDate: {
    type: String,
    // required: [true, "Due Date is required."],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  Files: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
  },
},
{ timestamps: true }
);

module.exports = mongoose.model("Issues", IssuesSchema);
