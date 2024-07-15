const User = require("@/models/account/users.model");
const jwt = require("jsonwebtoken");

const AssignJWTToken = async (user,clintType) => {
    let token 
    if(clintType == "mobile"){
        token = jwt.sign({ ...user }, process.env.JWT_SECRET);

    }else{
     token = jwt.sign({ ...user }, process.env.JWT_SECRET, { expiresIn: "1d" });

    }
    if (token) {
        await User.findOneAndUpdate({ _id: user._id }, { isLoggedIn: true, loggedInTime: new Date() });
        return { token: token, success: true, error: "", message: "Token assigned successfully." }
    }
    else {
        return { token: null, success: false, error: "Token not assigned to user.", message: message };
    }
}
module.exports = AssignJWTToken;

