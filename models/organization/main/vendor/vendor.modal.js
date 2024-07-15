const mongoose = require('mongoose');
const vendorDetailsSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        default: null  // Set default value to null for optional field
    },
    vendorName: {
        type: String,
        required: [true, "Vendor Name is required."]
    },
    address: {
        type: String,
        required: [true, "Business Address is required."]
    },
    vendorLevel: String, 
    vendorType: String, 
    contactPerson: {
        type: String,
        required: [true, "Contact Person is required."]
    },
    designation: String,
    contactNo: {
        type: Number,
        required: [true, "Contact Number is required."]
    },
    vendorEmail: {
        type: String,
        required: [true, "Vendor email is required."]
    },
    financialDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FinancialSchema", // Corrected model name
        default: null  
    },
    termsAndCondition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TermsAndCondition', // Corrected model name
        default: null 
    },
    uploadProof: {
        type: mongoose.Schema.Types.ObjectId,
         // Corrected model name
        default: null  
    }
}, { timestamps: true });

module.exports = mongoose.model("vendorDetails", vendorDetailsSchema);
