const mongoose = require("mongoose");

const MemberSchema = mongoose.Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    permission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
        required: true
    },
    isCreator: {
        type: Boolean,
        required: true,
        default: false
    },
    inviteAccepted: {
        type: Boolean,
        required: true,
        default: true
    },
    reject: {
        status: {
            type: Boolean,
            required: true,
            default: false
        },
        reason: {
            type: String,
            required: false
        }
    }
}, { timestamps: true });

module.exports = mongoose.model("Member", MemberSchema);