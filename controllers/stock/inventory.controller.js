const { default: mongoose } = require("mongoose")
const inventoryModels = require("../../models/organization/stock/inventory.model")
const pagination = require("../../utils/pagination")

const addInventory = async(req,res)=>{
    try {
        let payload = req.body
        let user = req.user
        let {organization} = req.query
        payload["createdBy"] = user?._id
        payload["organization"] = organization
        let inventoryData
        inventoryData = await inventoryModels.create(payload)
        console.log("inventoryData.......................".inventoryData)
        if(inventoryData){
            return res.status(201).json({
                success: true,
                Error: "",
                message: "Inventory Create Successfully !",
              });
        }

        return res.status(400).json({
            success: true,
            Error: "",
            message: "Inventory Not Create ",
          });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            Error: error,
            message: "Failed to get Inventory.",
          });
    }
}
const getAllInventory = async(req,res)=>{
    try {
        let payload = req.body
        let user = req.user
        let {organization,limit,page} = req.query
        payload["createdBy"] = user?._id
        payload["organization"] = organization
        let inventoryData
        let {skip,perPage} =await pagination(page,limit)
        let facet = {
            total:[
                {
                    '$count': 'total'
                }
            ],
            data:[
                {
                    $match:{
                        organization:new mongoose.Types.ObjectId(organization)
                      }
                },
                {
                    $skip:skip
                },
                {
                    $limit:perPage
                }
            ]
        }
        let aggregate = []
        aggregate.push({
            $facet:facet
        })
        inventoryData= await inventoryModels.aggregate(aggregate)
        inventoryData = inventoryData[0]
        let total = inventoryData?.total.length?inventoryData?.total[0]?.total:0
        let data = inventoryData?.data.length?inventoryData?.data:[]

        if(data.length){
            return res.status(201).json({
                success: true,
                Error: "",
                message: "Inventory Found Successfully !",
                data:data,
                total:total
              });
        }

        return res.status(404).json({
            success: true,
            Error: "",
            message: "Inventory Not Found ",
          });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            Error: error,
            message: "Failed to get Inventory.",
          });
    }
}
module.exports = {
    addInventory,
    getAllInventory
}