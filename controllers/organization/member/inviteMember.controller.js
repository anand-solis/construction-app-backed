const Member = require("@/models/organization/main/member.model");
const Permission = require("@/models/organization/main/permission.model");
const User = require("@/models/account/users.model");

const inviteMemberController = async (req, res) => {
    const { members } = req.body;
    const { organization } = req.query;
    let phone = [];

    try {
        if (members.length) {
            await Promise.all(members.map(async (member) => {
                if(member?.phone){
                    try {
                        let permission;
    
                        if(!member?.permission) {
                            const defaultPermission = await Permission.findOne({ organization: organization, name: "Project On-site Team" }).select("_id");
                            permission = defaultPermission._id;
                        }
                        else{
                            permission = member.permission;
                        }
    
                        const userCheck = await User.findOne({ "phone.number": member.phone }).select("_id");

                        if (userCheck?._id) {
                            const organizationMember = await Member
                                .findOne({ user: userCheck._id, organization: organization })
                                .select("_id");
    
                            if (!organizationMember?._id) {
                                const newMember = new Member({
                                    organization: organization,
                                    user: userCheck._id,
                                    permission: permission
                                });
    
                                await newMember.save();
                                phone.push(member.phone);
                            }
                        }
                        else {
                            const newUser = new User({
                                name: member?.name,
                                phone: {
                                    number: member.phone
                                }
                            })
    
                            const addedUser = await newUser.save();
    
                            const newMember = new Member({
                                organization: organization,
                                user: addedUser._id,
                                permission: permission
                            });
    
                            await newMember.save();
                            phone.push(member.phone);
                        }
                    } catch (error) {
                        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
                    }
                }
            }));

            if (phone.length > 0) {
                // Add SMS Controller
                return res.status(201).json({ success: true, error: "", message: "All members added successfully." });
            } else {
                return res.status(409).json({ success: false, error: "No member added from your given list.", message: "" });
            }
        } else {
            return res.status(409).json({ success: false, error: "No members provided in your given list.", message: "" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = inviteMemberController;