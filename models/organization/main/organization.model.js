const mongoose = require("mongoose");

const OrganizationSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Organization Name is required."]
    },
    email: {
        type: String,
        required: [true, "Organization Email is required."],
        lowercase: true,
        match: [
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            "Please enter a valid email address."
        ]
    },
    phone: {
        type: String,
        required: [true, "Organization Phone Number is required."],
        match: [
            /^\d{10}$/,
            "Please enter a valid 10-digit phone number."
        ]
    },
    address: String,
    city: String,
    state: String,
    pin_code: {
        type: String,
        match: [
            /^\d{6}$/,
            "Please enter a valid 6-digit pin code."
        ]
    },
    gst_number: String,
    pan_number: String,
    tan: String,
    blocked: {
        type: Boolean,
        required: true,
        default: false
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File"
    }
}, { timestamps: true });

module.exports = mongoose.model("Organization", OrganizationSchema);