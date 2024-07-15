const mongoose = require("mongoose");
const getStorageFile = require("@/utils/connections/storage/getStorageFile");


const moneyTransferSchema = mongoose.Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    },
    expenseId: {
        type: String,
        required: [true, "Expense Id is required."]
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Site",
        required: true,
      },
    transaction:{
        type:String,
        enum:["Transfer","Petty Cash"]  
    },
    paymentMode:{
        type:String,
        required: true
    },
    paymentDate:{
        type:Date,
        required: true
    },
    paidBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receivedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    },
    vendor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    
    remark:{
        type:String,
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["Approval Pending","Transferred"],
        default:"Approval Pending"
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File"
    }
}, { timestamps: true });

// moneyTransferSchema.post('find', async function(docs) {
//     docs.forEach(async (doc) => {
//       // Modify the specific field here
//       let data = "njsnjjnjjddddkdj"
//       doc.profile =  data
//     });
//   });

module.exports = mongoose.model("money_transfer", moneyTransferSchema);