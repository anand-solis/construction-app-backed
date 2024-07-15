const Permission = require("@/models/organization/main/permission.model");
const Member = require("@/models/organization/main/member.model");

const deleteMemberController = async (req, res) => {
    const { organization, id } = req.query;

    try {
        let memberDetails
        if(!id){
            return res.status(404).json({
                success: false,
                Error: "",
                message: "Member ID is required",
              });
        }
       
        memberDetails= await Member.findById(id)
        if(!memberDetails){
            return res.status(404).json({
                success: true,
                Error: "",
                message: "Member Not Found ",
              });
        }
        memberDetails = await Member.findByIdAndDelete(
            id,
        )
        if (memberDetails) {
            return res.status(200).json({ success: true, error: "", message: "Member Deleted successfully." });
        }


        return res.status(400).json({ success: false, error: "", message: "Member not Deleted " });

    } catch (error) {
        return res.status(500).json({ success: false, error: `Error ${error}`, message: "" });
    }
}

module.exports = deleteMemberController;