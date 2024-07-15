const moneyTransferModels = require("../../models/organization/main/moneyTransfer.model")
const formidable = require('formidable');
const uploadStorageFile = require("@/utils/connections/storage/uploadStorageFile");
const { default: mongoose } = require("mongoose");


const createMoneyTranferOrder = async (req, res) => {
    try {
        const { organization, site, transaction } = req.query;
        let user = req.user
        let payload = { organization, site, transaction, createdBy: user?.id }
        let moneyTranferData
        const form = new formidable.IncomingForm();
        await form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Error parsing form data:', err);
                return res.status(500).json({ success: false, error: 'Error parsing form data' });

            }
            if (fields?.paymentMode?.length) {
                payload["paymentMode"] = fields?.paymentMode[0]
            }
            if (fields?.paymentDate?.length) {
                payload["paymentDate"] = fields?.paymentDate[0]
            }
            if (fields?.paidBy?.length) {
                payload["paidBy"] = fields?.paidBy[0]
            }
            if (fields?.receivedBy?.length) {
                payload["receivedBy"] = fields?.receivedBy[0]
            }
            if (fields?.vendor?.length) {
                payload["vendor"] = fields?.vendor[0]
            }
            if (fields?.remark?.length) {
                payload["remark"] = fields?.remark[0]
            }
            if (fields?.amount?.length) {
                payload["amount"] = fields?.amount[0]
            }

        })
        const response = await uploadStorageFile(req, ["image"]);
        payload["profile"] = response?.file
        let lastCreatedOrder = await moneyTransferModels.aggregate([
            {
                $match: {
                    organization: new mongoose.Types.ObjectId(organization),
                    site: new mongoose.Types.ObjectId(site),
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
        let expenseId
        if (lastCreatedOrder.length) {
            let preOrder = lastCreatedOrder[0]?.expenseId
            preOrder = +preOrder.split("EXP")[1]
            expenseId = "EXP" + (preOrder + 1)?.toString().padStart(6, "0")

        } else {
            expenseId = "EXP000001"
        }
        payload["expenseId"] = expenseId
        moneyTranferData = await moneyTransferModels.create(payload)
        if (moneyTranferData) {
            return res.status(201).json({ data: moneyTranferData, success: true, error: "", message: "Money Transfer successfully created." });

        }
        return res.status(500).json({ data: {}, success: false, error: "", message: "Money Transfer create failed" });


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Create MoneyTranfer Order failed",
        });
    }
}

const getMoneyTranferOrder = async (req, res) => {
    try {
        const { organization, site, transaction } = req.query;
        let moneyTranferData
        let matchObj = {
            "organization": new mongoose.Types.ObjectId(organization)
        }
        // moneyTranferData = await moneyTransferModels.find()
        moneyTranferData = await moneyTransferModels.aggregate([
            {
                '$match': matchObj
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'createdBy',
                    'foreignField': '_id',
                    'as': 'createdBy'
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'receivedBy',
                    'foreignField': '_id',
                    'as': 'receivedBy'
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'vendor',
                    'foreignField': '_id',
                    'as': 'vendor'
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'paidBy',
                    'foreignField': '_id',
                    'as': 'paidBy'
                }
            }, {
                '$lookup': {
                    'from': 'sites',
                    'localField': 'site',
                    'foreignField': '_id',
                    'as': 'site'
                }
            }, {
                '$project': {
                    'transaction': 1,
                    'paymentMode': 1,
                    'paymentDate': 1,
                    'createdAt': 1,
                    'status': 1,
                    'remark': 1,
                    'vendor.name': 1,
                    'receivedBy.name': 1,
                    'createdBy.name': 1,
                    'paidBy.name': 1,
                    expenseId: 1,
                    "site.name": 1,
                    amount: 1,
                    profile:1
                }
            }
        ])
        if (moneyTranferData.length) {
            return res.status(200).json({ data: moneyTranferData, success: true, error: "", message: "Money Transfer found successfully " });

        }
        return res.status(404).json({ data: [], success: false, error: "", message: "Money Transfer not found " });


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Create MoneyTranfer Order failed",
        });
    }
}

const deleteMoneyTranferOrder = async (req, res) => {
    try {
        const { organization, site, id } = req.query;
        let moneyTranferData
        if (!id) {
            return res.status(404).json({
                success: false,
                Error: "",
                message: " ID is required",
            });
        }

        moneyTranferData = await moneyTransferModels.findById(id)
        if (!moneyTranferData) {
            return res.status(404).json({
                success: true,
                Error: "",
                message: "Data Not Found ",
            });
        }
        moneyTranferData = await moneyTransferModels.findByIdAndDelete(
            id,
        )
        if (moneyTranferData) {
            return res.status(200).json({ success: true, error: "", message: "Money Transfer Deleted successfully." });
        }

        return res.status(400).json({ success: false, error: "", message: "Money Transfer not Deleted " });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Money Transfer failed",
        });
    }
}

module.exports = {
    createMoneyTranferOrder,
    getMoneyTranferOrder,
    deleteMoneyTranferOrder
}