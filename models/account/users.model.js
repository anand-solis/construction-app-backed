const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        address: {
            type: String,
            lowercase: true,
            match: [
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                "Please enter a valid email address."
            ]
        },
        isValid: {
            type: Boolean,
            required: true,
            default: false
        },
    },
    phone: {
        number: {
            type: String,
            required: [true, "Phone Number is required."],
            unique: [true, "Phone Number must be unique."],
            match: [
                /^\d{10,15}$/,
                "Please enter a valid 10,15-digit phone number."
            ],
        },
        isValid: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    },
    blocked: {
        type: Boolean,
        required: true,
        default: false
    },
    isLoggedIn: {
        type: Boolean,
        required: true,
        default: false
    },
    loggedInTime: {
        type: Date,
        required: true,
        default: Date.now
    },
    isSuperAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File"
    }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);