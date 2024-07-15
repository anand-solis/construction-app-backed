const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");
const organizationMemberMiddleware = require("@/utils/middleware/organization/organizationMemberMiddleware");
const getAllMemberController = require("../../../controllers/organization/member/getAllMember.controller");
const inviteMemberController = require("../../../controllers/organization/member/inviteMember.controller");
const updateMemberController = require("../../../controllers/organization/member/updateMember.controller");
const inviteAcceptMemberController = require("../../../controllers/organization/member/inviteAcceptMember.controller");
const inviteRejectMemberController = require("../../../controllers/organization/member/inviteRejectMember.controller");
const resendInviteMemberController = require("../../../controllers/organization/member/resendInviteMember.controller");
const deleteMemberController = require("../../../controllers/organization/member/deleteMember.controller")
const sitAssignMemberController = require('../../../controllers/organization/site/main/addSiteMembers.controller')
const router = express.Router();

const key = "members";
const plan = "admin_settings";

router.get(
    "/members",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    getAllMemberController
);

router.post(
    "/member/invite",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    inviteMemberController
);

router.post(
    "/member/invite/accept",
    Middleware,
    (req, res, next) => organizationMemberMiddleware(req, res, next, true),
    inviteAcceptMemberController
);

router.post(
    "/member/invite/reject",
    Middleware,
    (req, res, next) => organizationMemberMiddleware(req, res, next, true),
    inviteRejectMemberController
);

router.post(
    "/member/invite/resend/:id",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    resendInviteMemberController
);

router.patch(
    "/member/update/:id",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "update", plan),
    updateMemberController
);
router.delete(
    "/member/delete",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "update", plan),
    deleteMemberController
);
router.get(
    "/member/sitAssignMember",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "update", plan),
    sitAssignMemberController
);

module.exports = router;