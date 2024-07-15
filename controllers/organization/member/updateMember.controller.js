const Permission = require("@/models/organization/main/permission.model");
const Member = require("@/models/organization/main/member.model");

const updateMemberController = async (req, res) => {
    const { id } = req.params;
    const { permission } = req.body;
    const { organization } = req.query;

    try {
        const checkPermission = await Permission.findOne({ _id: permission, organization: organization }).select("_id");

        if(checkPermission?._id){
            await Member.findOneAndUpdate(
                { _id: id, organization: organization },
                { permission: permission }
            )

            return res.status(200).json({ success: true, error: "", message: "Permission updated successfully." }); 
        }
        else{
            return res.status(409).json({ success: false, error: "This permission not associated to your organization.", message: "" }); 
        }
    } catch (error){
        return res.status(500).json({ success: false, error: `Error ${error}`, message: "" }); 
    }
}

module.exports = updateMemberController;