"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../controllers/auth");
const errorHandling_1 = require("../../middlewares/errorHandling");
const jwtHelper_1 = require("../../middlewares/jwtHelper");
const router = (0, express_1.Router)();
router.post('/login', (0, errorHandling_1.asyncHandler)(auth_1.login));
router.get('/logout', jwtHelper_1.verifyTokenMiddleware, (0, errorHandling_1.asyncHandler)(auth_1.logout));
router.post('/register', (0, errorHandling_1.asyncHandler)(auth_1.register));
router.post('/refresh-token', jwtHelper_1.verifyRefreshTokenMiddleware, (0, errorHandling_1.asyncHandler)(auth_1.refreshToken));
exports.default = router;
