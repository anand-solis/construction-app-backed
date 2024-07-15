const generateCode = () => {
    // Generate a random six-digit number
    const min = 100000; // Minimum value for a six-digit number
    const max = 999999; // Maximum value for a six-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = generateCode;