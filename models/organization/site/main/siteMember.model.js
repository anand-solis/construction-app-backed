const mongoose = require("mongoose");

const SiteMemberSchema = mongoose.Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Site",
        required: true
    },
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
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
        default: false
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

module.exports = mongoose.model("SiteMember", SiteMemberSchema);