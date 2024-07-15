const mongoose = require("mongoose");

const FloorSchema = mongoose.Schema({
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
    name: {
        type: String,
        required: [true, "Floor name is required."]
    },
    number: {
        type: Number,
        required: [true, "Floor number is required."]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model("Floor", FloorSchema);