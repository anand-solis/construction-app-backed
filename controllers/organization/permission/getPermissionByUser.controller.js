const Member = require("@/models/organization/main/member.model");

const getPermissionByUserController = async (req, res) => {
    const { organization, key } = req.query;

    try {
        const permission = await Member
            .findOne({ user: req.user._id, organization: organization })
            .select("permission")
            .populate({
                path: "permission",
                select: "features",
                populate: {
                    path: "features.feature",
                    select: "key",
                    match: {
                        "key": key
                    }
                }
            })

        let response = await permission.permission?.features.filter(value => {
            return value.feature;
        });

        let denied = {
            read: false,
            update: false,
            delete: false,
            insert: false
        }

        return res.status(200).json({ permission: response[0]?.permissions || denied, success: true, error: "", message: "User permission fetched successfully." });
    } catch (error) {
        return res.status(500).json({ permission: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = getPermissionByUserController;