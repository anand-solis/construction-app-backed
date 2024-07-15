const validateParam = (param) => {
    emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    phoneRegex = /^\d{10}$/;

    if (emailRegex.test(param)) {
        return { success: true, type: "email" };
    }
    else if (phoneRegex.test(param)) {
        return { success: true, type: "phone" };
    }
    else {
        return { success: false, type: null };
    }
}

module.exports = validateParam;