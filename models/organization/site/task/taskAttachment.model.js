const mongoose = require("mongoose");

const TaskAttachmentSchema = mongoose.Schema({
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
    attachment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("TaskAttachment", TaskAttachmentSchema);