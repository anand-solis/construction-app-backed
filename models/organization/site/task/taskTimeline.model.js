const mongoose = require("mongoose");

const TaskTimelineSchema = mongoose.Schema({
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
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true
    },
    progress: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("TaskTimeline", TaskTimelineSchema);