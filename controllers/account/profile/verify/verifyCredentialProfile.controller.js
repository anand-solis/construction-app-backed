const Verify = require("@/models/account/verify.model");
const User = require("@/models/account/users.model");
const OTPExpiryValidation = require("@/utils/account/OTPExpiryValidation.controller");
const AssignJWTToken = require("@/controllers/account/login/AssignToken.controller");
const { sqliteInsert, sqliteDelete } = require("@/utils/connections/database/sqlite");

const verifyCredentialProfileController = async (req, res) => {
    const { param, otp } = req.body;

    try {
        const VerifyResponse = await Verify.findOne({ otp: otp, param: param }).select("type param createdAt");

        if (VerifyResponse?._id) {
            const notExpire = OTPExpiryValidation(VerifyResponse.createdAt);

            if (notExpire.success && !notExpire.expire) {
                let updates = {};

                if (VerifyResponse.type == "email") {
                    updates = {
                        "email": {
                            "address": param,
                            "isValid": true
                        }
                    };
                }
                else if (VerifyResponse.type == "phone") {
                    updates = {
                        "phone": {
                            "number": param,
                            "isValid": true
                        }
                    };
                }

                const user = await User.findOneAndUpdate(
                    { _id: req.user._id },
                    { $set: updates }
                );

                const authHeader = req.headers["authorization"];
                const token = authHeader && authHeader.split(" ")[1];
        
                sqliteInsert(token);
                sqliteDelete();
                
                const assigned = await AssignJWTToken(user);

                if (assigned.success) await Verify.deleteMany({ param: param });

                return res.status(200).json({ token: assigned.token, success: true, error: "", message: `Profile ${VerifyResponse.type} details updated successfully.` });
            }
            else {
                return res.status(200).json({ token: null, success: false, error: "Verification OTP is expired.", message: "" });
            }
        }
        else {
            return res.status(200).json({ token: null, success: false, error: "Verification OTP Not found in the database.", message: "" });
        }
    } catch (error) {
        return res.status(500).json({ token: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = verifyCredentialProfileController;