const Indent = require("@/models/organization/site/commercial/indent.model");
const { default: mongoose } = require("mongoose");

const AddIndentController = async (req, res) => {
  const { organization, site } = req.query;
  const data = req.body;
  
  const indentpayload = {
    ...data,
    organization: organization,
    site: site,
    createdBy: req.user._id,
  }; 

  try {
    let lastCreatedIndent = await Indent.aggregate([
      {
        $match:{
          organization:new mongoose.Types.ObjectId(organization),
          site:new mongoose.Types.ObjectId(site),
        }
      },
      {
        '$sort': {
            'createdAt': -1
        }
    }, {
        '$limit': 1
    }
    ])
    let indentId
    if(lastCreatedIndent.length){
     let  preIndent = lastCreatedIndent[0]?.indentId
     if(!preIndent){
       indentId = "MT01"
     }else{
      preIndent = +preIndent.split("MT")[1]
      if(preIndent<10){
      indentId = "MT0" + (preIndent + 1)
      }else{
      indentId = "MT" + (preIndent + 1)
      }
     }
    
    }else{
      indentId = "MT01"
    }
    indentpayload["indentId"] = indentId
    const indentdata = await Indent.create(indentpayload);

    return res.status(201).json({
      indentdata,
      success: true,
      message: "Indent added successfully.",
    });
  } catch (err) {
    console.log(err  )
    return res.status(500).json({
      success: false,
      message: "Failed to add Indent",
      error:err?.errors
    });
  }
};

module.exports = AddIndentController;
