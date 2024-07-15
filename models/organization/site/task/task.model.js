const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Site",
        required: true
    },
    floor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Floor",
        required: true
    },
    taskNumber: {
        type: Number,
    },
    taskName: {
        type: String,
        required: [true, "Task name is required."]
    },
    description: {
        type: String,
        required: false
    },
    workCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WorkCategory",
        required: [true, "Task work category is required."]
    },
    endDate: {
        type: String,
        required: [true, "Task end date is required."]
    },
    startDate: {
        type: String,
        required: [true, "Task start date is required."]
    },
    // expectedCost: {
    //     type: Number,
    //     required: [true, "Task expected cost is required."]
    // },
    totalCost: {
        type: Number,
        default: ""
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);