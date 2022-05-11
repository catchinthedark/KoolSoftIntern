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
exports.deleteProfile = exports.updateProfile = exports.addProfile = exports.getProfile = exports.getProfiles = void 0;
const profile_1 = __importDefault(require("../../models/profile"));
const mongoose_1 = __importDefault(require("mongoose"));
const error_1 = require("../../common/error");
const response_1 = require("../../common/response");
const getProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountID, role } = req.credentials;
    if (role != 'HR')
        throw new error_1.ForbiddenError({ error: "You don't have permission to do this." });
    const profiles = yield profile_1.default.find();
    return (0, response_1.successResponse)(res, profiles);
});
exports.getProfiles = getProfiles;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountID, role } = req.credentials;
    let thisAccountID = accountID;
    const _id = new mongoose_1.default.Types.ObjectId(req.params.id);
    if (role === 'HR' && thisAccountID !== _id)
        thisAccountID = _id;
    const profile = yield profile_1.default.findOne({ accountID: thisAccountID });
    if (!profile)
        return (0, response_1.failureResponse)(res, { data: -2 });
    return (0, response_1.successResponse)(res, profile);
});
exports.getProfile = getProfile;
const addProfile = (account) => __awaiter(void 0, void 0, void 0, function* () {
    let type;
    if (account.role === 'Applicant')
        type = 'CV';
    else
        type = 'Profile';
    const cvNote = {
        status: '',
        note: ''
    };
    const workInfo = {
        department: '',
        title: '',
        salary: 0,
        type: '',
        hireDate: ''
    };
    const profile = new profile_1.default({
        accountID: account._id,
        type: type,
        cvNote: cvNote,
        workInfo: workInfo,
        workExperience: [],
        personalProjects: [],
        achievements: [],
        education: [],
    });
    const newProfile = yield profile.save();
    return newProfile;
});
exports.addProfile = addProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const updatedProfile = yield profile_1.default.findOneAndUpdate({ _id: body._id }, { $set: { type: body.type, cvNote: body.cvNote, workInfo: body.workInfo, workExperience: body.workExperience, personalProjects: body.personalProjects, achievements: body.achievements, education: body.education } });
    if (!exports.updateProfile)
        throw new error_1.BadRequestError({ message: 'Profile not found!' });
    const profile = yield profile_1.default.findById({ _id: body._id });
    const allProfiles = yield profile_1.default.find();
    return (0, response_1.successResponse)(res, { profile: profile, profiles: allProfiles });
});
exports.updateProfile = updateProfile;
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountID, role } = req.credentials;
    if (role != 'HR')
        throw new error_1.ForbiddenError({ error: "You don't have permission to do this." });
    const _Id = new mongoose_1.default.Types.ObjectId(req.params.id);
    const deletedProfile = yield profile_1.default.findByIdAndDelete(_Id);
    const allProfiles = yield profile_1.default.find();
    if (!deletedProfile)
        return (0, response_1.failureResponse)(res, { data: -2 });
    return (0, response_1.successResponse)(res, { profile: deletedProfile, profiles: allProfiles });
});
exports.deleteProfile = deleteProfile;
