const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");

const organizationMemberMiddleware = require("@/utils/middleware/organization/organizationMemberMiddleware");
const getAllAddedSiteMemberController = require("../../../../controllers/organization/site/member/main/getAllAddedSiteMember.controller");
const getAllNotAddedSiteMemberController = require("../../../../controllers/organization/site/member/main/getAllNotAddedSiteMember.controller");
const inviteSiteMemberController = require("../../../../controllers/organization/site/member/invite/inviteSiteMember.controller");
const inviteAcceptSiteMemberController = require("../../../../controllers/organization/site/member/invite/inviteAcceptSiteMember.controller");
const inviteRejectSiteMemberController = require("../../../../controllers/organization/site/member/invite/inviteRejectSiteMember.controller");
const resendInviteSiteMemberController = require("../../../../controllers/organization/site/member/invite/resendInviteSiteMember.controller");
const getSiteMembers = require("../../../../controllers/organization/site/main/getSitemember.controller");
const inviteMemberController = require("../../../../controllers/organization/member/getInvitationAcceptedMembers.controllers")


const router = express.Router();

const key = "site-members";
const plan = "project_management";

router.get(
    "/site/members",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, "sites", "read", plan),
    siteMiddleware,
    getAllAddedSiteMemberController
);

router.get(
    "/site/not-members",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    siteMiddleware,
    getAllNotAddedSiteMemberController
);

router.post(
    "/site/member/invite",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    siteMiddleware,
    inviteSiteMemberController
);

router.post(
    "/site/member/reject",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    siteMiddleware,
    inviteRejectSiteMemberController
);
router.post(
    "/site/member/invite/resend/:id",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    siteMiddleware,
    resendInviteSiteMemberController
);

router.post(
    "/site/member/invite/accept",
    Middleware,
    (req, res, next) => organizationMemberMiddleware(req, res, next, true),
    (req, res, next) => siteMiddleware(req, res, next, true),
    inviteAcceptSiteMemberController
);
router.get(
    "/site/getMembers",
    Middleware,
    (req, res, next) => organizationMemberMiddleware(req, res, next, true),
    (req, res, next) => siteMiddleware(req, res, next, true),
    getSiteMembers
);
router.get(
    "/site/getInvitationAcceptMembers",
    Middleware,
    (req, res, next) => organizationMemberMiddleware(req, res, next, true),
    inviteMemberController
);


module.exports = router;