const mongoose = require("mongoose");

const SiteSchema = mongoose.Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    },
    endDate: {
        type: String,
        required: [true, "Site end date is required."]
    },
    name: {
        type: String,
        required: [true, "Site name is required."]
    },
    startDate: {
        type: String,
        required: [true, "Site start date is required."]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    sitePocId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    siteOfficeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File"
    },
    siteDocuments:{
        Type:Array
    },
    siteMember:{
        type:Array
    }
}, { timestamps: true });

module.exports = mongoose.model("Site", SiteSchema);