const Verify = require("@/models/account/verify.model");
const User = require("@/models/account/users.model");
const validateParam = require("@/controllers/account/profile/verify/validateParam.controller");
const generateCode = require("@/utils/account/generateCode.controller");
const sendEmailController = require("@/controllers/app/email/sendEmail.controller");
const sendSMSController = require("@/controllers/app/sms/sendSMS.controller");
const EmailVerificationOTP = require("@/templates/emails/EmailVerificationOTP.template");
const SMSVerificationOTP = require("@/templates/sms/SMSVerificationOTP.template");

const SendOTPVerifyCredentialProfileController = async (req, res) => {
    const { param } = req.body;

    try {
        const validation = validateParam(param);
        const code = generateCode();

        if (validation.success) {
            const user = await User.findOne({ _id: req.user._id });
            
            if(validation.type == "phone" && param == user.phone.number && user.phone.isValid) return res.status(200).json({ success: false, error: "This phone number is already verified.", message: "" });
            if(validation.type == "email" && param == user.email.address && user.email.isValid) return res.status(200).json({ success: false, error: "This email address is already verified.", message: "" });

            await Verify.create({ otp: code, param: param, type: validation.type });

            if (validation.type == "email") {
                const emailParams = {
                    email: param,
                    subject: "Verification OTP",
                    content: EmailVerificationOTP(code)
                }

                const sendEmail = await sendEmailController(emailParams);

                return res.status(200).json({ success: sendEmail.success, error: sendEmail.error, message: sendEmail.message });
            }
            else if (validation.type == "phone") {
                const sendSMS = await sendSMSController(param, SMSVerificationOTP(code));

                return res.status(200).json({ success: sendSMS.success, error: sendSMS.error, message: sendSMS.message });
            }
        }
        else {
            return res.status(400).json({ success: false, error: `Email / Mobile Number is not valid.`, message: "" });
        }
    }
    catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = SendOTPVerifyCredentialProfileController;