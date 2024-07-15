const { sqliteInsert, sqliteDelete } = require("@/utils/connections/database/sqlite");

const LogoutController = async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    try {
        sqliteInsert(token);
        sqliteDelete();

        return res.status(200).json({ success: true, error: "", message: "User logout successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = LogoutController;