const express = require("express");

const ProfileController = require("../../controllers/account/profile/main/profile.controller");
const CheckNewUserController = require("../../controllers/account/profile/main/checkNewUser.controller");
const GetProfileController = require("../../controllers/account/profile/main/getProfile.controller");
const UpdateProfileController = require("../../controllers/account/profile/main/updateProfile.controller");
const SendOTPVerifyCredentialProfileController = require("../../controllers/account/profile/verify/sendOTPVerifyCredentialProfile.controller");
const VerifyCredentialProfileController = require("../../controllers/account/profile/verify/verifyCredentialProfile.controller");

const Middleware = require("@/utils/middleware/middleware");

const router = express.Router();

router.patch(
    "/setting-up-account",
    Middleware,
    ProfileController
);

router.get(
    "/profile/new",
    Middleware,
    CheckNewUserController
);

router.get(
    "/profile/me",
    Middleware,
    GetProfileController
);

router.patch(
    "/profile/update/default",
    Middleware,
    UpdateProfileController
);

router.post(
    "/profile/verify/send-otp",
    Middleware,
    SendOTPVerifyCredentialProfileController
);

router.patch(
    "/profile/verify",
    Middleware,
    VerifyCredentialProfileController
);

module.exports = router;