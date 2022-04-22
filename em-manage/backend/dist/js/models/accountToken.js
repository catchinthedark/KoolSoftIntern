"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const AccountTokenSchema = new mongoose_1.Schema({
    accountID: {
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: "account"
    },
    accessToken: String,
    refreshToken: String
});
exports.default = (0, mongoose_1.model)("accountToken", AccountTokenSchema);
