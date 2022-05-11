"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CVNoteSchema = exports.PastDegreeSchema = exports.PastWorkSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const WorkInfoSchema = new mongoose_1.Schema({
    department: String,
    title: String,
    salary: Number,
    type: String,
    hireDate: String //only profile
});
exports.PastWorkSchema = new mongoose_1.Schema({
    no: Number,
    company: String,
    jobTitle: String,
    from: String,
    to: String,
    description: String
});
exports.PastDegreeSchema = new mongoose_1.Schema({
    no: Number,
    school: String,
    degree: String,
    fieldOfStudy: String,
    yearOfCompletion: String,
    description: String
});
exports.CVNoteSchema = new mongoose_1.Schema({
    status: String,
    note: String,
});
const ProfileSchema = new mongoose_1.Schema({
    accountID: {
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: "account"
    },
    type: String,
    cvNote: exports.CVNoteSchema,
    workInfo: WorkInfoSchema,
    workExperience: [exports.PastWorkSchema],
    personalProjects: [exports.PastWorkSchema],
    achievements: [exports.PastDegreeSchema],
    education: [exports.PastDegreeSchema],
});
exports.default = (0, mongoose_1.model)("profile", ProfileSchema);
