const mongoose = require("mongoose");

const VerifySchema = mongoose.Schema({
    otp: {
        type: String,
        required: [true, "OTP is required."]
    },
    param: {
        type: String,
        required: [true, "Param is required."]
    },
    type: {
        type: String,
        required: [true, "Param type is required."]
    },
}, { timestamps: true });

module.exports = mongoose.model("Verify", VerifySchema);