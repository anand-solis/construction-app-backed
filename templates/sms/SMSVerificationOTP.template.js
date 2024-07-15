const SMSVerificationOTP = (code) => {
    const template = `Hi, Someone recently requested a OTP for your account. If this was you, This is your verification code: ${code}. If you don't want to Login or didn't request this, just ignore and delete this message. To keep your account secure, please don't forward this message to anyone.`;

    return template;
}
module.exports = SMSVerificationOTP;