"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const geoSchema = new mongoose_1.Schema({
    lat: {
        type: String,
        required: false,
    },
    lng: {
        type: String,
        required: false,
    },
});
const addressSchema = new mongoose_1.Schema({
    street: {
        type: String,
        required: false,
    },
    suite: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    zipcode: {
        type: String,
        required: false,
    },
    geo: {
        type: geoSchema,
        required: false,
    },
});
const companySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: false,
    },
    catchphrase: {
        type: String,
        required: false,
    },
    bs: {
        type: String,
        required: false,
    },
});
const employeeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: addressSchema,
        required: false,
    },
    phone: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: false,
    },
    company: {
        type: companySchema,
        required: false,
    },
});
exports.default = (0, mongoose_1.model)("Employee", employeeSchema, "employee");
