const mongoose = require('mongoose');

const rootVendorSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    organization :{
        type:mongoose.Schema.Types.ObjectId,
        default : null ,
       
    },
    finaicialdetails:{
        type:mongoose.Schema.Types.ObjectId,
        default : null ,
        ref :"VendorFinancial"
    },
    uploadProof:{
        type:mongoose.Schema.Types.ObjectId,
        default : null ,
        ref :"uploadProofVendor"
    },
    termsAndCondition:{
        type:mongoose.Schema.Types.ObjectId,
        default : null ,
        ref :"termsAndCondition"
    },
    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        default : null ,
        ref:"vendorDetails"
    }
},{timestamp : true});
module.exports = mongoose.model("rootVendor",rootVendorSchema)