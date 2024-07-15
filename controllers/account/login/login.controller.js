const OTPExpiryValidation = require("@/utils/account/OTPExpiryValidation.controller");
const AssignJWTToken = require("@/controllers/account/login/AssignToken.controller");
const User = require("@/models/account/users.model");
const OTP = require("@/models/account/otp.model");

const LoginController = async (req, res) => {
    try {
        const { phone, otp } = req.body;
        let {clintType} = req.query

        const OTPResponse = await OTP.findOne({ otp: "222222", phone: phone }).select("phone createdAt");

        if (OTPResponse?._id) {
            const notExpire = OTPExpiryValidation(OTPResponse.createdAt);

            if (notExpire.success && !notExpire.expire) {
                const UserResponse = await User.findOne({ "phone.number": OTPResponse.phone });

                if(UserResponse?._id){
                    const assigned = await AssignJWTToken(UserResponse,clintType);

                    if(assigned.success) await OTP.deleteMany({ phone: phone });

                    return res.status(200).json({ success: assigned.success, error: assigned.error, token: assigned.token });
                }
                else{
                    const AddedUser = new User({
                        phone: {
                            number: OTPResponse.phone,
                            isValid: true
                        }
                    });

                    const userAdded = await AddedUser.save();
                    const assigned = await AssignJWTToken(userAdded,clintType);

                    if(assigned.success) await OTP.deleteMany({ phone: phone });

                    return res.status(200).json({ success: assigned.success, error: assigned.error, token: assigned.token });
                }
            }
            else {
                return res.status(410).json({ success: false, error: "OTP is expired." });
            }
        }
        else {
            return res.status(404).json({ success: false, error: "OTP Not found in the database" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}` });
    }
}

module.exports = LoginController;