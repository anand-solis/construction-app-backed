const Feature = require("@/models/app/features.model");
const DefaultPermission = require("@/models/app/defaultPermission.model");

const CreateDefaultPermissionController = async (req, res) => {
    const { name, isAdmin } = req.body;
    
    try {
        if(isAdmin){
            const response = await DefaultPermission.findOne({ isAdmin: true }).select("_id");

            if(response?._id){
                return res.status(409).json({ success: false, error: "Admin permissions already exist.", message: "" });
            }
            else{
                await create(name, isAdmin, res);
            }
        }
        else{
            await create(name, isAdmin, res);
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

async function create(name, isAdmin, res){
    const features = await Feature.find({}).select("_id");

    if (features.length > 0) {
        let NewDefaultPermissionRules = {
            name: name,
            isAdmin: isAdmin,
            features: []
        };

        features.map((feature) => {
            let permissions = {
                read: false,
                update: false,
                delete: false,
                insert: false,
            }

            if(isAdmin){
                permissions = {
                    read: true,
                    update: true,
                    delete: true,
                    insert: true,
                }
            }
            NewDefaultPermissionRules.features.push({
                feature: feature._id,
                permissions
            })
        })

        const NewDefaultPermission = new DefaultPermission(NewDefaultPermissionRules);
        await NewDefaultPermission.save();

        return res.status(201).json({ success: true, error: "", message: "New default permission created successfully." });
    }
    else {
        return res.status(200).json({ success: false, error: "You don't have any features yet.", message: "" });
    }
}

module.exports = CreateDefaultPermissionController;