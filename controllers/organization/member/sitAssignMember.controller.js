const siteModels = require("../../../models/organization/site/main/site.model");
const { default: mongoose } = require("mongoose");
const sitAssignMemberController = async (req, res) => {
    
    const { organization ,site} = req.query;

    try {
        if(!site){
            return res.status(200).json({ success: true, error: "", message: "Site is required" }); 
        }
        let siteAssignMember = await siteModels.aggregate([
            {
                $match:{
                    _id:new mongoose.Types.ObjectId(site)
                }
            },
            {
                '$lookup': {
                    'from': 'users', 
                    'localField': 'siteMember', 
                    'foreignField': '_id', 
                    'as': 'members'
                }
            }
        ])

        if(siteAssignMember?.length){
            

            return res.status(200).json({ success: true, error: "", message: "Meber data found successfully." }); 
        }
         return res.status(409).json({ success: false, error: "Meber data not found", message: "" }); 
    } catch (error){
        return res.status(500).json({ success: false, error: `Error ${error}`, message: "" }); 
    }
}

module.exports = sitAssignMemberController;