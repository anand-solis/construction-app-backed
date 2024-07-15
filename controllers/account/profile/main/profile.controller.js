const User = require("@/models/account/users.model");

const ProfileController = async (req, res) => {
    const { name, email, role } = req.body;
    try {
        if (!name) {
            return res.status(422).json({ success: false, error: "Name is required.", message: "" });
        }
        if (!role) {
            return res.status(422).json({ success: false, error: "Role is required.", message: "" });
        }
        if (!email) {
            return res.status(422).json({ success: false, error: "Email is required.", message: "" });
        }
        
        const emailCheck = await User.findOne({ email: { address : email } }).select("_id");

        if(emailCheck?._id){
            return res.status(409).json({ success: false, error: "Email already exist.", message: "" });
        }
        
        await User.findOneAndUpdate(
            { _id: req?.user?._id }, {
            name: name,
            role: role,
            email: {
                address: email,
                isValid: false
            }
        }
        );

        return res.status(200).json({ success: true, error: "", message: "Profile updated successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = ProfileController;