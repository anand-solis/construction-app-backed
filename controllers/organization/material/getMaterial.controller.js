const material = require("@/models/organization/main/material/material.modal");
const pagination= require("../../../utils/pagination");
const { default: mongoose } = require("mongoose");

const getAllmaterialdata = async (req, res) => {

  try {
    const { organization, bom,page,limit } = req.query;
    let materialdata
    let {skip,perPage} = await pagination(page,limit)
    let matchObj = {
      organization:new mongoose.Types.ObjectId(organization)
    }
    if (bom) {
      matchObj["uom"] = {
        $regex:bom,
        $options:"i"
      }
    }
    
    let facet = {
      total:[
        {
          $match:matchObj
        },
          {
              '$count': 'total'
          }
      ],
      data:[
          {
              $match:matchObj
          },
          // {
          //     $skip:skip
          // },
          // {
          //     $limit:perPage
          // }
      ]
  }
  let aggregate = []
  aggregate.push({
      $facet:facet
  })
  materialdata= await material.aggregate(aggregate)
  materialdata = materialdata[0]
  let total = materialdata?.total.length?materialdata?.total[0]?.total:0
  let data = materialdata?.data.length?materialdata?.data:[]
  if(data.length){
    return res.status(200).json({
      success: true,
      data: data,
      message: "Materials found successfully.",
    });
  }
  return res.status(404).json({
    success: false,
    data: [],
    message: "Materials not found ",
  });
    
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: "Failed to get Material.",
    });
  }
};

module.exports = getAllmaterialdata