const mongoose =require('mongoose');

const uploadProofSchema = mongoose.Schema({

    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        organization :{

        type:mongoose.Schema.Types.ObjectId,
        required:[true ,"Organization is required."]
    },
    vendorId:{

        type:mongoose.Schema.Types.ObjectId,
        required:[true , "vendor Id is required."]
    },
    gst: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        required: true
    },
    pan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        required: true
    },
    bankDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model("uploadProofVendor",uploadProofSchema)