"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../controllers/auth");
const errorHandling_1 = require("../../middlewares/errorHandling");
const router = (0, express_1.Router)();
router.post('/login', (0, errorHandling_1.asyncHandler)(auth_1.login));
router.post('/logout', (0, errorHandling_1.asyncHandler)(auth_1.logout));
router.get('/getMe/:username', (0, errorHandling_1.asyncHandler)(auth_1.getMe));
exports.default = router;
