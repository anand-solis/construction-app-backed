const materialIssueModels = require("@/models/organization/main/material/materialIssue.model")
const uploadStorageFile = require("@/utils/connections/storage/uploadStorageFile");
const getStorageFile = require("@/utils/connections/storage/getStorageFile");
const { default: mongoose } = require("mongoose");

const addMaterailIssue = async (req, res) => {
    try {
        const { organization ,site} = req.query;
        let userId = req.user?._id
        const IssuesData = { organization: organization, createdBy: userId,site };
        const response = await uploadStorageFile(req, ["image"]);
        console.log("response////////////////////////////////////",response)
        if (response.success) {
            IssuesData["profile"] = response?.file
        }
        if (response?.fields?.issueType[0] !== undefined) IssuesData["issueType"] = response.fields.issueType[0];
        if (response?.fields?.materialName?.[0] !== undefined) IssuesData["materialName"] = response.fields.materialName[0];
        if (response?.fields?.issueTitle?.[0] !== undefined) IssuesData["issueTitle"] = response.fields.issueTitle[0];
        if (response?.fields?.vendorId?.[0] !== undefined) IssuesData["vendorId"] = response.fields.vendorId[0];
        if (response?.fields?.dueDate?.[0] !== undefined) IssuesData['dueDate'] = response.fields.dueDate[0];
        if (response?.fields?.description?.[0] !== undefined) IssuesData['description'] = response.fields.description[0];
        if (response?.fields?.issueTitle?.[0] !== undefined) IssuesData["issueTitle"] = response.fields.issueTitle[0];
        if (response?.fields?.vendorId?.[0] !== undefined) IssuesData["vendorId"] = response.fields.vendorId[0];
        if (response?.fields?.site?.[0] !== undefined) IssuesData["site"] = response.fields.site[0];

        const issueData = await materialIssueModels.create(IssuesData);

        if (issueData) {
            return res.status(201).json({
                success: true,
                message: "Issue raised successfully.",
            });
        } else {
            return res.status(500).json({
                success: false,
                msg: "Failed to raise issue .",
            });
        }


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            msg: "Failed to Update issue .",
        });
    }
}

const deleteMaterialIssues = async (req, res) => {
    try {
        const { organization, site, issueId } = req.query;
        let issueData
        if (!issueId) {
            return res.status(404).json({
                success: false,
                Error: "",
                message: "Issue ID is required",
            });
        }
        issueData = await materialIssueModels.findById(issueId)
        if (!issueData) {
            return res.status(404).json({
                success: false,
                Error: "",
                message: " Issue Not Found ",
            });
        }
        issueData = await materialIssueModels.findByIdAndDelete(issueId)


        if (issueData) {
            return res.status(200).json({
                success: true,
                message: " Issue delete successfully.",
            });
        } else {
            return res.status(500).json({
                success: false,
                msg: "Failed to Issue deletion .",
            });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: "Failed to Issue deletion .",
            error: err.message,
        });
    }
};

const updateMaterailIssue = async (req, res) => {
    try {

        const { organization, issueId ,site} = req.query;
        if (!issueId) {
            return res.status(404).json({
                success: true,
                message: "Issue ID is required",
            });
        }
        const IssuesData = {};
        if(site){
            IssuesData['site'] = site
        }
        const response = await uploadStorageFile(req, ["image"]);
        if (response.success) {
            IssuesData["profile"] = response?.file
        }
        if (response?.fields?.issueType[0] !== undefined) IssuesData["issueType"] = response.fields.issueType[0];
        if (response?.fields?.materialName?.[0] !== undefined) IssuesData["materialName"] = response.fields.materialName[0];
        if (response?.fields?.issueTitle?.[0] !== undefined) IssuesData["issueTitle"] = response.fields.issueTitle[0];
        if (response?.fields?.vendorId?.[0] !== undefined) IssuesData["vendorId"] = response.fields.vendorId[0];
        if (response?.fields?.dueDate?.[0] !== undefined) IssuesData['dueDate'] = response.fields.dueDate[0];
        if (response?.fields?.description?.[0] !== undefined) IssuesData['description'] = response.fields.description[0];
        if (response?.fields?.issueTitle?.[0] !== undefined) IssuesData["issueTitle"] = response.fields.issueTitle[0];
        if (response?.fields?.vendorId?.[0] !== undefined) IssuesData["vendorId"] = response.fields.vendorId[0];
        if (response?.fields?.status?.[0] !== undefined) IssuesData["status"] = response.fields.status[0];

console.log("IssuesData...................................",IssuesData)
        const issueData = await materialIssueModels.findByIdAndUpdate(issueId, IssuesData);

        if (issueData) {
            return res.status(200).json({
                success: true,
                message: "Issue Update successfully.",
            });
        } else {
            return res.status(500).json({
                success: false,
                msg: "Failed to Update issue .",
            });
        }


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            msg: "Failed to Update issue .",
        });
    }
}

const getMaterailIssues = async (req, res) => {
    try {
        const { organization } = req.query;
        let issueData
        issueData = await materialIssueModels.aggregate([
            {
                '$match': {
                    'organization': new mongoose.Types.ObjectId(organization)
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'createdBy',
                    'foreignField': '_id',
                    'as': 'users'
                }
            }, {
                '$lookup': {
                    'from': 'rootvendors',
                    'localField': 'vendorId',
                    'foreignField': '_id',
                    'as': 'vendors'
                }
            },
            {
                '$lookup': {
                    'from': 'vendordetails',
                    'localField': 'vendors.vendor',
                    'foreignField': '_id',
                    'as': 'vendorDetailas'
                }
            },
            {
                '$lookup': {
                    'from': 'sites',
                    'localField': 'site',
                    'foreignField': '_id',
                    'as': 'siteDetails'
                }
            },
            {
                '$lookup': {
                    'from': 'files',
                    'localField': 'profile',
                    'foreignField': '_id',
                    'as': 'filedetails'
                }
            },
            {
                '$project': {
                    'issueType': 1, 
                    'materialName': 1, 
                    'issueTitle': 1, 
                    'dueDate': 1, 
                    'status': 1, 
                    'description': 1, 
                    'createdAt': 1,
                    updatedAt:1,
                    "users.name":1,
                    "vendorDetailas.vendorName":1,
                    "siteDetails.name":1,
                    "filedetails.url" :1
                    // "users.name":1,
                }
            }
        ]);

        for (const site of issueData) {
            if (site?.filedetails.length && site?.filedetails[0]?.url) {
                const profile = await getStorageFile(site?.filedetails[0]?.url);
                site.url = profile.file;
            }
        }

        if (issueData.length) {
            return res.status(200).json({
                success: true,
                data:issueData,
                message: "Issue found successfully.",
            });
        } else {
            return res.status(500).json({
                success: false,
                data:[],
                msg: "Issue not found",
            });
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data:[],
            msg: "Issue not found",
        });
    }
}

module.exports = {
    addMaterailIssue,
    deleteMaterialIssues,
    updateMaterailIssue,
    getMaterailIssues
}