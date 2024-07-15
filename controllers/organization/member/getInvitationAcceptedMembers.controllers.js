const Member = require("@/models/organization/main/member.model");
const Permission = require("@/models/organization/main/permission.model");
const User = require("@/models/account/users.model");
const { default: mongoose } = require("mongoose");

const inviteAcceptedMemberController = async (req, res) => {
    const { organization } = req.query;

    try {
        let memberData
        if(!organization){
            return res.status(400).json({ success: false, error: "", message: "Organization Is Required " })
        }
        memberData = await Member.aggregate([
            {
                $match:{
                    organization:new mongoose.Types.ObjectId(organization),
                    inviteAccepted:true
                }
            },
            {
                '$lookup': {
                    'from': 'users', 
                    'localField': 'user', 
                    'foreignField': '_id', 
                    'as': 'memberDetails'
                }
            },
            {
                '$unwind': {
                    'path': '$memberDetails'
                }
            },
            {
                '$project': {
                    'memberDetails._id': 1, 
                    'memberDetails.name': 1,
                    _id:0
                }
            }
        ])
        if(!memberData.length){
            return res.status(404).json({ success: false, error: "", message: "Member Data not found " })
        }
        return res.status(200).json({ success: true, error: "", message: "Member Data found Successfully !",data: memberData})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = inviteAcceptedMemberController;