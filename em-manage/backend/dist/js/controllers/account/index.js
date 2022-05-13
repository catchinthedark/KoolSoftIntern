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
exports.deleteAccount = exports.updateAccount = exports.getAccount = exports.getAccounts = void 0;
const account_1 = __importDefault(require("../../models/account"));
const profile_1 = __importDefault(require("../../models/profile"));
const accountToken_1 = __importDefault(require("../../models/accountToken"));
const error_1 = require("../../common/error");
const response_1 = require("../../common/response");
const getAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accounts = yield account_1.default.find();
    return (0, response_1.successResponse)(res, accounts);
});
exports.getAccounts = getAccounts;
const getAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountID, role } = req.credentials;
    const body = req.body;
    const account = yield account_1.default.findById(body._id);
    if (!account)
        throw new error_1.ServerError({ data: -1 });
    return (0, response_1.successResponse)(res, account);
});
exports.getAccount = getAccount;
const updateAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountID, role } = req.credentials;
    const body = req.body;
    const updatedAccount = yield account_1.default.findOneAndUpdate({ _id: body._id }, { $set: { role: body.role, personalInfo: body.personalInfo, contactInfo: body.contactInfo, url: body.url } });
    if (!updatedAccount)
        throw new error_1.BadRequestError({ message: 'Account not found!' });
    let myAccount = yield account_1.default.findById({ _id: accountID });
    const allAccounts = yield account_1.default.find();
    return (0, response_1.successResponse)(res, { account: myAccount, accounts: allAccounts });
});
exports.updateAccount = updateAccount;
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountID, role } = req.credentials;
    const body = req.body;
    if (role != 'HR')
        throw new error_1.ForbiddenError({ error: "You don't have permission to do this." });
    const deletedAccount = yield account_1.default.findByIdAndDelete(body._id);
    if (!deletedAccount)
        return (0, response_1.failureResponse)(res, { data: -2 });
    const allAccounts = yield account_1.default.find();
    const deletedProfile = yield profile_1.default.findOneAndDelete({ accountID: body._id });
    if (!deletedProfile)
        return (0, response_1.failureResponse)(res, { data: -2 });
    const allProfiles = yield profile_1.default.find();
    const deletedAccountToken = yield accountToken_1.default.findOneAndDelete({ accountID: body._id });
    if (!deletedAccountToken)
        return (0, response_1.failureResponse)(res, { data: -2 });
    return (0, response_1.successResponse)(res, { accounts: allAccounts, profiles: allProfiles });
});
exports.deleteAccount = deleteAccount;
