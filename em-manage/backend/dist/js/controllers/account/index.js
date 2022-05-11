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
const mongoose_1 = __importDefault(require("mongoose"));
const error_1 = require("../../common/error");
const response_1 = require("../../common/response");
const getAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accounts = yield account_1.default.find();
    return (0, response_1.successResponse)(res, accounts);
});
exports.getAccounts = getAccounts;
const getAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountID, role } = req.credentials;
    let thisAccountID = accountID;
    const _id = new mongoose_1.default.Types.ObjectId(req.params.id);
    if (role === 'HR' && thisAccountID !== _id)
        thisAccountID = _id;
    const account = yield account_1.default.findById(thisAccountID);
    if (!account)
        throw new error_1.ServerError({ data: -1 });
    return (0, response_1.successResponse)(res, account);
});
exports.getAccount = getAccount;
const updateAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const updatedAccount = yield account_1.default.findOneAndUpdate({ _id: body._id }, { $set: { role: body.role, personalInfo: body.personalInfo, contactInfo: body.contactInfo, url: body.url } });
    if (!updatedAccount)
        throw new error_1.BadRequestError({ message: 'Account not found!' });
    const account = yield account_1.default.findById({ _id: body._id });
    const allAccounts = yield account_1.default.find();
    return (0, response_1.successResponse)(res, { account: account, accounts: allAccounts });
});
exports.updateAccount = updateAccount;
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountID, role } = req.credentials;
    if (role != 'HR')
        throw new error_1.ForbiddenError({ error: "You don't have permission to do this." });
    const _Id = new mongoose_1.default.Types.ObjectId(req.params.id);
    const deletedAccount = yield account_1.default.findByIdAndDelete(_Id);
    const allAccounts = yield account_1.default.find();
    if (!deletedAccount)
        return (0, response_1.failureResponse)(res, { data: -2 });
    return (0, response_1.successResponse)(res, { account: deletedAccount, accounts: allAccounts });
});
exports.deleteAccount = deleteAccount;
