const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");

const GetAllMediaLibraryFilesController = require("../../../controllers/organization/mediaLibrary/getAllMediaLibraryFiles.controller");
const EditMediaLibraryFileController = require("../../../controllers/organization/mediaLibrary/editMediaLibraryFile.controller");
const RemoveMediaLibraryFileController = require("../../../controllers/organization/mediaLibrary/removeMediaLibraryFile.controller");

const router = express.Router();

const key = "media-library";
const plan = "media_library";

router.get(
    "/media-library/files",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    GetAllMediaLibraryFilesController
);

router.patch(
    "/media-library/update/:id",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "update", plan),
    EditMediaLibraryFileController
);

router.delete(
    "/media-library/remove/:id",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "delete", plan),
    RemoveMediaLibraryFileController
);

module.exports = router;