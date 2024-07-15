const sendSMSController = async (number, content) => {
    return { success: true, error: "", message: "SMS send successfully." };
}

module.exports = sendSMSController;