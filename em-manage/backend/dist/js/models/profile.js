"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PastDegreeSchema = exports.PastWorkSchema = void 0;
const mongoose_1 = require("mongoose");
const WorkInfoSchema = new mongoose_1.Schema({
    department: String,
    title: String,
    salary: Number,
    type: String,
    hireDate: String
});
exports.PastWorkSchema = new mongoose_1.Schema({
    company: String,
    jobTitle: String,
    from: String,
    to: String,
    description: String
});
exports.PastDegreeSchema = new mongoose_1.Schema({
    school: String,
    degree: String,
    fieldOfStudy: String,
    yearOfCompletion: Number,
    description: String
});
const ProfileSchema = new mongoose_1.Schema({
    username: {
        type: String,
        ref: "account"
    },
    workInfo: WorkInfoSchema,
    workExperience: [exports.PastWorkSchema],
    education: [exports.PastDegreeSchema]
});
exports.default = (0, mongoose_1.model)("profile", ProfileSchema);
