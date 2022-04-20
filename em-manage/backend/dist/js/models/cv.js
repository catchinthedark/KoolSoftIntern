"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const profile_1 = require("./profile");
const CVSchema = new mongoose_1.Schema({
    username: {
        type: String,
        ref: "account"
    },
    status: String,
    round: Number,
    note: String,
    workExperience: [profile_1.PastWorkSchema],
    education: [profile_1.PastDegreeSchema]
});
exports.default = (0, mongoose_1.model)("cv", CVSchema);
