const OTP = require("@/models/account/otp.model");
const validatePhone = require("@/controllers/account/otp/validatePhone.controller");
const generateCode = require("@/utils/account/generateCode.controller");
const sendSMSController = require("@/controllers/app/sms/sendSMS.controller");
const SMSVerificationOTP = require("@/templates/sms/SMSVerificationOTP.template");

const OTPController = async (req, res) => {
    const { phone } = req.body;

    try {
        const phoneValidate = validatePhone(phone);
      //  const code = generateCode();
        const code = 222222;

        if (phoneValidate.success) {
            await OTP.deleteMany({otp:code,phone:phone})

            const otp = new OTP({ otp: code, phone: phone });
            await otp.save();

            const sendSMS = await sendSMSController(phone, SMSVerificationOTP(code));

            return res.status(200).json({ success: sendSMS.success, error: sendSMS.error, message: sendSMS.message });
        }
        else {
            return res.status(400).json({ success: false, error: `Mobile Number is not valid.`, message: "" });
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = OTPController;