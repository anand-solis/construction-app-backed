const DefaultPermission = require("@/models/app/defaultPermission.model");

const UpdateDefaultPermissionController = async (req, res) => {
    const { permissions } = req.body;

    try{
        const prevDefaultPermission = await DefaultPermission.findOne({ _id: permissions._id });

        if(!prevDefaultPermission?.isAdmin){
            let updateDefaultPermission = prevDefaultPermission;
            updateDefaultPermission.name = permissions.name;
            updateDefaultPermission.updatedAt = new Date();
            updateDefaultPermission.updatedBy = req.user._id;

            const featureKeys = Object.keys(permissions.features);

            featureKeys && featureKeys.map(key => {
                const index = updateDefaultPermission.features.findIndex(item => item._id == key);
    
                updateDefaultPermission.features[index].permissions.read = permissions.features[key].read;
                updateDefaultPermission.features[index].permissions.update = permissions.features[key].update;
                updateDefaultPermission.features[index].permissions.delete = permissions.features[key].delete;
                updateDefaultPermission.features[index].permissions.insert = permissions.features[key].insert;
    
                if(permissions.features[key].update || permissions.features[key].delete || permissions.features[key].insert){
                    updateDefaultPermission.features[index].permissions.read = true;
                }
            });
    
            await DefaultPermission.findOneAndUpdate({ _id: permissions._id }, updateDefaultPermission);
    
            return res.status(200).json({ success: true, error: "", message: "Default Permission updated successfully." });
        }
        else{
            return res.status(401).json({ success: false, error: "Admin Default Permissions can't change.", message: "" });
        }
    } catch (error){
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = UpdateDefaultPermissionController