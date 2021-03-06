"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cv_1 = require("../../controllers/cv");
const errorHandling_1 = require("../../middlewares/errorHandling");
const router = (0, express_1.Router)();
router.get('/all', (0, errorHandling_1.asyncHandler)(cv_1.getCVs));
router.get('/:username', (0, errorHandling_1.asyncHandler)(cv_1.getCVByUsername));
router.post('/add', (0, errorHandling_1.asyncHandler)(cv_1.addCV));
router.put('/update/:id', (0, errorHandling_1.asyncHandler)(cv_1.updateCV));
router.delete('/delete/:id', (0, errorHandling_1.asyncHandler)(cv_1.deleteCV));
exports.default = router;
