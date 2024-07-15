const mongoose = require("mongoose");
const createOrganization = require("@/controllers/organization/main/createOrganization.controller");
const createDefaultPermissions = require("@/controllers/organization/main/createDefaultPermissions.controller");
const createSubscriptionPlan = require("@/controllers/organization/main/createSubscriptionPlan.controller");
const sendEmailController = require("@/controllers/app/email/sendEmail.controller");
const SuccessCreateOrganization = require("@/templates/emails/SuccessCreateOrganization.template");
const defaultWorksCategoryModels  = require("../../../models/organization/main/defaultWorkCategory")
const workCategoryModels = require("../../../models/organization/main/workCategory.model")

const OrganizationController = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { name, email, phone } = req.body;
    
    try {
        const user = req.user
        let userId = user?._id?.toString()
        const organization = await createOrganization(req, session);
        if (organization.success) {
            const defaultWorkCategory = await defaultWorksCategoryModels.find()
            for(let i = 0;i<defaultWorkCategory.length;i++){
                let data = await workCategoryModels.create({
                    organization:organization?.id,
                    name:defaultWorkCategory[i]?.name,
                    createdBy:userId
                })
            }
            await createSubscriptionPlan(organization.id, session);
            await createDefaultPermissions(organization.id, req?.user?._id, session);

            const emailParams = {
                email: `${req.user.email.address}, ${email}`,
                subject: "Organization Successfully Created",
                content: SuccessCreateOrganization(name, email, phone)
            }
            
            await sendEmailController(emailParams);

            await session.commitTransaction();
            session.endSession();

            return res.status(201).json({ success: true, error: "", message: "Organization created successfully." });
        }
        else {
            await session.commitTransaction();
            session.endSession();

            return res.status(200).json({ success: organization.success, error: organization.error, message: organization.message });
        }
    } catch (error) {
        console.log(error)
        await session.abortTransaction();
        session.endSession();

        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = OrganizationController;