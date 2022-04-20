"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCV = exports.updateCV = exports.addCV = exports.getCVByUsername = exports.getCVs = void 0;
const cv_1 = __importDefault(require("../../models/cv"));
const mongoose_1 = __importDefault(require("mongoose"));
const getCVs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const CVs = yield cv_1.default.find();
    res.status(200)
        .json(CVs);
});
exports.getCVs = getCVs;
const getCVByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cv = yield cv_1.default.findOne({ username: req.params.username });
    res.status(200)
        .json(cv);
});
exports.getCVByUsername = getCVByUsername;
const addCV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const cv = new cv_1.default({
        username: body.username,
        status: body.status,
        round: body.round,
        note: body.note,
        workExperience: body.workExperience,
        education: body.education
    });
    const newCV = yield cv.save();
    const allCVs = yield cv_1.default.find();
    res.status(201)
        .json({ message: "CV added", cv: newCV, CVs: allCVs });
});
exports.addCV = addCV;
const updateCV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id }, body } = req;
    const _Id = new mongoose_1.default.Types.ObjectId(id);
    const updatedCV = yield cv_1.default.findByIdAndUpdate({ _id: _Id }, body);
    const allCVs = yield cv_1.default.find();
    res.status(200)
        .json({ message: "CV updated", cv: updatedCV, CVs: allCVs });
});
exports.updateCV = updateCV;
const deleteCV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _Id = new mongoose_1.default.Types.ObjectId(req.params.id);
    const deletedCV = yield cv_1.default.findByIdAndDelete(_Id);
    const allCVs = yield cv_1.default.find();
    res.status(200)
        .json({ message: "CV deleted", cv: deletedCV, CVs: allCVs });
});
exports.deleteCV = deleteCV;
