const superAdminMiddleware = async (req, res, next) => {
    try {
        if (req.user?.isSuperAdmin) {
            next();
        }
        else{
            return res.status(401).json({ success: false, error: "You don't have permissions to do this task." });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}` });
    }
}

module.exports = superAdminMiddleware;