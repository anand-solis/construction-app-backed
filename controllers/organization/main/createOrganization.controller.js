const Organization = require("@/models/organization/main/organization.model");

const createOrganization = async (req) => {
    const { name, phone, email } = req.body;

    try{
        const newOrganization = new Organization({ name: name, phone: phone, email: email })
        
        const organization = await newOrganization.save();

        return { id: organization._id, success: true, error: "", message: "Organization Created Successfully."};
    }
    catch (error){
        return { id: null, success: false, error: `Error: ${error}`, message: "" };
    }
}

module.exports = createOrganization;