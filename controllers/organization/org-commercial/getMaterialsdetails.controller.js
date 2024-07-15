const Indent = require("@/models/organization/site/commercial/indent.model");
const { default: mongoose } = require("mongoose");

const getIndentMaterialsdetails = async (req, res) => {
  const { organization, site } = req.query;


  try {
    let indentId = req.query.indentId
    if(!indentId){
        return res.status(404).json({
            success: true,
            data: [],
            message: "Indent Id is required",
          });
    }
    let matchObj = {
        _id:    new mongoose.Types.ObjectId(indentId),
        organization:new mongoose.Types.ObjectId(organization)
    }
    let materialData = []
    let Indentdata = await Indent.aggregate([
        {
          '$match': matchObj
        }, {
          '$lookup': {
            'from': 'materials', 
            'localField': 'materialId.material', 
            'foreignField': '_id', 
            'as': 'materials'
          }
        }, {
          '$lookup': {
            'from': 'purchaseorders', 
            'localField': '_id', 
            'foreignField': 'indentId.id', 
            'as': 'poData'
          }
        }
      ])
    let indentMaterialData = Indentdata[0]?.materialId
    let poData = Indentdata[0]?.poData
    let getMaterialsdetailsArray = []
    let matrialName = Indentdata[0]?.materials
    for(let i =0;i<indentMaterialData.length;i++){
        let indentMaterialid = indentMaterialData[i]?.material?.toString()
        let indentMatrialQuantity = indentMaterialData[i]?.quantity
        let poMaterialQuantity = 0
        let matrialNameArr = []
        let instockArr =  []
        for(let l = 0;l<matrialName.length;l++){
            matrialNameArr.push(matrialName[l]?.materialName)
            instockArr.push(matrialName[l]?.inStocks?matrialName[l]?.inStocks:0)
        }
        for(let j =0;j<poData.length;j++){
            let poMatrialData = poData[j]?.material
            for(let k =0;k<poMatrialData.length;k++){
                let poMatrialId = poMatrialData[k]?.itemDetails?.toString()
                if(poMatrialId == indentMaterialid){
                    matrialName = poMatrialData[k]?.quantity
                    poMaterialQuantity = poMaterialQuantity + poMatrialData[k]?.quantity
                }
    
            }
        }
        getMaterialsdetailsArray.push({
            requisted:indentMatrialQuantity,
            matrialId:indentMaterialid,
            odered:poMaterialQuantity,
            matrialName:matrialNameArr[i],
            instock:instockArr[i]
        })
    }
    if(getMaterialsdetailsArray.length){
        return res.status(200).json({
            success: true,
            data: getMaterialsdetailsArray,
            message: "Data Get Successfully.",
          });
    }
    return res.status(404).json({
      success: true,
      data: getMaterialsdetailsArray,
      message: " Data not found",
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      Error: err,
      message: "Failed to get Indent.",
    });
  }
};

module.exports = getIndentMaterialsdetails;
