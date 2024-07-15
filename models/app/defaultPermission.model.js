const mongoose = require("mongoose");

const DefaultPermissionSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Default Permission name is required."]
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
    ]
}, { timestamps: true });

module.exports = mongoose.model("DefaultPermission", DefaultPermissionSchema);