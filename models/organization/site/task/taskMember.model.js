const mongoose = require("mongoose");

const TaskMemberSchema = mongoose.Schema({
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
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SiteMember",
        required: true
    },
    isCreator: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("TaskMember", TaskMemberSchema);