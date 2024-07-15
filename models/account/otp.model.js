const mongoose = require("mongoose");

const OTPSchema = mongoose.Schema({
    otp: {
        type: String,
        required: [true, "OTP is required."]
    },
    phone: {
        type: String,
        required: [true, "Phone No. is required."]
    }
}, { timestamps: true });

module.exports = mongoose.model("OTP", OTPSchema);