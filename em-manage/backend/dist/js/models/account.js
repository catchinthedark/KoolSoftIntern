"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PersonalInfoSchema = new mongoose_1.Schema({
    name: String,
    gender: String,
    dob: String,
});
const ContactInfoSchema = new mongoose_1.Schema({
    email: String,
    phone: String,
    address: String,
});
const AccountSchema = new mongoose_1.Schema({
    username: String,
    password: String,
    role: String,
    personalInfo: PersonalInfoSchema,
    contactInfo: ContactInfoSchema,
    url: String
});
exports.default = (0, mongoose_1.model)("account", AccountSchema);
