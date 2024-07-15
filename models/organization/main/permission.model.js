const mongoose = require("mongoose");

const PermissionSchema = mongoose.Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    },
    name: {
        type: String,
        required: [true, "Permission name is required."]
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    features: [
        {
            feature: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Feature",
                required: true
            },
            permissions: {
                read: {
                    type: Boolean,
                    required: true,
                    default: false
                },
                update: {
                    type: Boolean,
                    required: true,
                    default: false
                },
                delete: {
                    type: Boolean,
                    required: true,
                    default: false
                },
                insert: {
                    type: Boolean,
                    required: true,
                    default: false
                },
            },
        },
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
}, { timestamps: true });

module.exports = mongoose.model("Permission", PermissionSchema);