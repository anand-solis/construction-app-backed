const mongoose = require("mongoose");

const PurchaseOrder = mongoose.Schema({
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Site",
    required: true,
  },
  indentId: [
    {id:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Indent"
    }
    }
  ],
  poId: {
    type: String,
    required: [true,"poid is required ."],
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "rootVendor",
    required: true,
  },
  expectedDelivery: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  billingDetails: {
    type: String,
    required: true,
  },
  poStatus: {
    type: Boolean,
    default: false,
  },
  termsandcondition: {
    type: String,
  },
  remarks: {
    type: String,
  },
  material: [
    {
      itemDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material",
        required: [true, "Material Id is required."], // Replace 'OtherModel' with the actual name of the referenced model
      },
      quantity: {
        type: Number,
        required: true,
      },
      deliveryQuantity: {
        type: Number,
      },
      unitCost: {
        type: Number,
        required: true,
      },
      gst:{
        type: String,
        required: true,
      },
      discount:{
        type: String,
      },
      amount:{
        type: Number,
        required: true,
      }

    },
  ],
  gstType: {
    type: String,
    required: true
  },
  subTotal:{
    type:Number,
    required: true
  },
  subTotal:{
    type:Number,
  },
  totalDiscount:{
    type:Number,
    default:0
  },
  totalIncludingTax:{
    type:Number,
    required: true
  },
  roundOfTotal:{
    type:Number,
    required: true
  },
  gstDetails:{
    type:Array
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File"
},
poOrderedStatus:{
  type:String,
  default:"Approval Pending",
  enum:["Approval Pending","Delivered","Partially Delivered","Ordered","Excess Delivered"]
}
},
{
  timestamps:true
}
);

module.exports = mongoose.model("PurchaseOrder", PurchaseOrder);
