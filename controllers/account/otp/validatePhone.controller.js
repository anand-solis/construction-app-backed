const validatePhone = (phone) => {
    phoneRegex = /^\d{10}$/;

    if (phoneRegex.test(phone)) {
        return { success: true };
    }
    else {
        return { success: false };
    }
}

module.exports = validatePhone;