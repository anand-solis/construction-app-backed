const Feature = require("@/models/app/features.model");
const Permission = require("@/models/organization/main/permission.model");

const createPermissionController = async (req, res) => {
    const { name } = req.body;
    const { organization } = req.query;
    try {
        const features = await Feature.find({}).select("_id");

        if (features.length > 0) {
            let NewPermissionRules = {
                organization: organization,
                name: name,
                createdBy: req?.user?.id,
                features: []
            };

            features.map((feature) => {
                NewPermissionRules.features.push({
                    feature: feature._id,
                    permissions: {
                        read: false,
                        update: false,
                        delete: false,
                        insert: false,
                    }
                })
            })

            const NewPermission = new Permission(NewPermissionRules);
            await NewPermission.save();

            return res.status(201).json({ success: true, error: "", message: "New permission created successfully." });
        }
        else {
            return res.status(200).json({ success: false, error: "You don't have any features yet.", message: "" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = createPermissionController;