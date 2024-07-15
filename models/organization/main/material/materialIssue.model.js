const mongoose = require("mongoose");
const workCategoryModel = require("../../main/workCategory.model");

const materialIssueSchema = mongoose.Schema({
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Site",
    required: [true, "organization required."],
  },
  issueType:{
    type:String
  },
  materialName:{
    type:String,
    required: true,
  },
  issueTitle:{
    type:String,
    required: true,
  },    
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "rootVendor",
    required: true,
  },
  dueDate: {
    type: Date,
    // required: true,
  },
  status: {
    type: String,
    enum:["Pending","Resolved"],
    default:"Pending"
  },
  description: {
    type: String,
    // required: [true, "Issue Reason  is required."],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File"
},
},
{ timestamps: true }
);

module.exports = mongoose.model("material_issue", materialIssueSchema);
