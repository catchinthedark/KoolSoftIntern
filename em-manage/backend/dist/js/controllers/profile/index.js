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
exports.deleteProfile = exports.updateProfile = exports.addProfile = exports.getProfileByUsername = exports.getProfiles = void 0;
const profileModel = require("../../models/profile");
const mongoose_1 = __importDefault(require("mongoose"));
const getProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profiles = yield profileModel.find();
    res.status(200)
        .json(profiles);
});
exports.getProfiles = getProfiles;
const getProfileByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profile = yield profileModel.findOne({ username: req.params.username });
    res.status(200)
        .json(profile);
});
exports.getProfileByUsername = getProfileByUsername;
const addProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const profile = new profileModel({
        username: body.username,
        workInfo: body.workInfo,
        workExperience: body.workExperience,
        education: body.education
    });
    const newProfile = yield profile.save();
    const allProfiles = yield profileModel.find();
    res.status(201)
        .json({ message: "Profile added", profile: newProfile, profiles: allProfiles });
});
exports.addProfile = addProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id }, body } = req;
    const _Id = new mongoose_1.default.Types.ObjectId(id);
    const updatedProfile = yield profileModel.findByIdAndUpdate({ _id: _Id }, body);
    const allProfiles = yield profileModel.find();
    res.status(200)
        .json({ message: "Profile updated", profile: updatedProfile, profiles: allProfiles });
});
exports.updateProfile = updateProfile;
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _Id = new mongoose_1.default.Types.ObjectId(req.params.id);
    const deletedProfile = yield profileModel.findByIdAndDelete(_Id);
    const allProfiles = yield profileModel.find();
    res.status(200)
        .json({ message: "Profile deleted", profile: deletedProfile, profiles: allProfiles });
});
exports.deleteProfile = deleteProfile;
