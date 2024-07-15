const mongoose = require("mongoose");

const FileSchema = mongoose.Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: false
    },
    used: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    alternative_text: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    extension: {
        type: String,
        required: true
    },
    mime: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
}, { timestamps: true });

module.exports = mongoose.model("File", FileSchema);