const mongoose = require('mongoose')

const MaterialSchema = mongoose.Schema({
        organization:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Organization",
            required : true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        materialCode:{
            type:String
        },
        materialName:{
            type:String,
            required:[true , "Material Name is required."]
        },
        brandName :{
            type:String,
            required:[true , "Brand Name is required."]
        },
        uom:{
            type:String,
            required:[true , "Unit Of Material (UOM) is required."]
        },
        unitCost:{
            type : Number
        },
        description:{
            type:String
        },
        gst:{
            type:String,
            // required:[true , "GST is required."]
        },
        hsn:{
            type:String
        },
        inStocks: {
            type: Number,
        },
        usedFromStocks: {
            type: Number,
        },
        color:{
            type:String
        },
        weight:{
            type:String
        },
        isbn:{
            type:String
        },
        manufacturing:{
            type:String
        },
        upc:{
            type:String
        },
        ean:{
            type:String
        },
        length:{
            type:String
        },
        breadth:{
            type:String
        },
        height:{
            type:String
        },
        diameter:{
            type:String
        },
        photo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "File",
            
        },

},{timestamps:true})


module.exports = mongoose.model("Material" , MaterialSchema)