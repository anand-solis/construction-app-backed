const User = require("@/models/account/users.model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const connectSqliteDB = require("@/utils/connections/database/connectSqliteDB");
require("dotenv").config();

const Middleware = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    try {
        if (!token) {
            return res.status(401).json({ success: false, error: "Unauthorized user, token not available." });
        }
        else {
            const connectionSqliteDB = connectSqliteDB();

            connectionSqliteDB.serialize(() => {
                connectionSqliteDB.get(`SELECT token FROM tokens WHERE token = ?`, [token], async (error, row) => {
                    if (error) {
                        return res.status(500).json({ success: false, error: `Error: ${error}` });
                    }
                    else if (row?.token) {
                        return res.status(400).json({ success: false, expired: true, error: "This token is expired." });
                    }
                    else {
                        try{
                            const decoded = await jwt.verify(token, process.env.JWT_SECRET);

                            const _id = new mongoose.Types.ObjectId(decoded?._doc?._id);
    
                            const user = await User.findOne({ _id: _id });
                            if (!user) {
                                return res.status(401).json({ success: false, error: "User account not found." });
                            }
                            if (user.blocked) {
                                return res.status(401).json({ success: false, error: "User account blocked.", blocked: true });
                            }
                            user.token = token;
                            req.user = user;
                            next();
                        } catch (error) {
                            return res.status(401).json({ success: false, error: `Error: ${error}` });
                        }
                    }
                });
            });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}` });
    }
}

module.exports = Middleware;