const User = require("@/models/account/users.model");

const CheckNewUserController = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req?.user?._id });

        if(user?._id){
            if(user?.email?.address){
                return res.status(200).json({ exist: true, isNew: false, success: true, error: "" });
            }
            else{
                return res.status(200).json({ exist: true, isNew: true, success: true, error: "" });
            }
        }
        else{
            return res.status(200).json({ exist: false, isNew: null, success: true, error: "" });
        }
    } catch (error) {
        return res.status(500).json({ exist: null, isNew: null, success: false, error: `Error: ${error}` });
    }
}

module.exports = CheckNewUserController;