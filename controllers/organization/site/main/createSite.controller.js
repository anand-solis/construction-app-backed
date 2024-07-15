const Site = require("@/models/organization/site/main/site.model");
const Plan = require("@/models/organization/main/plan.model");
const Member = require("@/models/organization/main/member.model");
const SiteMember = require("@/models/organization/site/main/siteMember.model");
const uploadStorageFile = require("@/utils/connections/storage/uploadStorageFile");
const formidable = require('formidable');
const { default: mongoose } = require("mongoose");

const CreateSiteController = async (req, res) => {


    try {
        const { organization } = req.query;
        let user = req.user
        let userId = user?._id
        userId = new mongoose.Types.ObjectId(userId)
        const form = new formidable.IncomingForm();
        let SiteName, siteStartDate, siteEndDate
        let siteMember = [userId]
        let PocDetails = {}
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Error parsing form data:', err);
                return res.status(500).json({ success: false, error: 'Error parsing form data' });

            }
            let { name, startDate, endDate ,sitePocId,siteOfficeId} = fields
            name = name[0]
            startDate = startDate[0]
            endDate = endDate[0]
            SiteName = name
            if(sitePocId){
             sitePocId = sitePocId[0]
                PocDetails["sitePocId"] = sitePocId
            }
            if(siteOfficeId){
             siteOfficeId = siteOfficeId[0]
                PocDetails["siteOfficeId"] = siteOfficeId
            }
            siteStartDate = startDate
            siteEndDate = endDate

        })
        const response = await uploadStorageFile(req, ["image"]);
        const plan = await Plan
            .findOne({ organization: organization })
            .select("subscription")
            .populate({
                path: "subscription",
                select: "sites_count"
            });

    //
        const createdSites = await Site.find({ organization: organization }).select("_id");
        const createdSitesCount = createdSites.length;
        const newSite = new Site({
            name: SiteName,
            startDate: siteStartDate,
            endDate: siteEndDate,
            organization: organization,
            createdBy: req?.user?._id,
            profile: response.file,
            siteMember:siteMember,
            ...PocDetails,
            k:lll
        });

        const newSiteResponse = await newSite.save();
        if (newSiteResponse?._id) {
            const OrganizationMember = await Member.findOne({ organization: organization, user: req.user._id }).select("_id");

            if (OrganizationMember?._id) {
                const NewSiteMember = new SiteMember({
                    site: newSiteResponse?._id,
                    organization: organization,
                    member: OrganizationMember._id,
                    isCreator: true,
                    inviteAccepted: true
                })

                await NewSiteMember.save();

                return res.status(201).json({ site: newSiteResponse?._id, success: true, error: "", message: "Site successfully created." });
            }
            else {
                return res.status(401).json({ site: null, success: false, error: "You are not a member of this organization.", message: "" });
            }
        }
        else {
            return res.status(400).json({ site: null, success: false, error: "Site not created.", message: "" });
        }

        //

        // if (plan?.subscription?.sites_count) {
        //     if (createdSitesCount < plan?.subscription?.sites_count) {
        //         const newSite = new Site({
        //             name: SiteName,
        //             startDate: siteStartDate,
        //             endDate: siteEndDate,
        //             organization: organization,
        //             createdBy: req?.user?._id,
        //             profile: response.file
        //         });

        //         const newSiteResponse = await newSite.save();
        //         console.log("newSiteResponse...........", newSiteResponse)
        //         if (newSiteResponse?._id) {
        //             const OrganizationMember = await Member.findOne({ organization: organization, user: req.user._id }).select("_id");

        //             if (OrganizationMember?._id) {
        //                 const NewSiteMember = new SiteMember({
        //                     site: newSiteResponse?._id,
        //                     organization: organization,
        //                     member: OrganizationMember._id,
        //                     isCreator: true,
        //                     inviteAccepted: true
        //                 })

        //                 await NewSiteMember.save();

        //                 return res.status(201).json({ site: newSiteResponse?._id, success: true, error: "", message: "Site successfully created." });
        //             }
        //             else {
        //                 return res.status(401).json({ site: null, success: false, error: "You are not a member of this organization.", message: "" });
        //             }
        //         }
        //         else {
        //             return res.status(400).json({ site: null, success: false, error: "Site not created.", message: "" });
        //         }
        //     }
        //     else {
        //         return res.status(401).json({ site: null, success: false, error: "Error: You exceed limit to create site in your organization, Upgrade your subscription plan.", message: "" });
        //     }
        // }
        // else {
        //     return res.status(401).json({ site: null, success: false, error: "Error: You don't have this features in your subscription plan.", message: "" });
        // }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ site: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = CreateSiteController;