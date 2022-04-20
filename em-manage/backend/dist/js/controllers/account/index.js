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
exports.deleteAccount = exports.updateAccount = exports.addAccount = exports.getAccounts = void 0;
const account_1 = __importDefault(require("../../models/account"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = require("../../middlewares/auth");
const error_1 = require("../../common/error");
const getAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accounts = yield account_1.default.find();
    res.status(200)
        .json(accounts);
});
exports.getAccounts = getAccounts;
const addAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const foundAccount = yield account_1.default.findOne({ username: body.username });
    if (foundAccount)
        throw new error_1.BadRequestError({ message: 'Username existed!' });
    const password = yield (0, auth_1.enncryptPassword)((0, auth_1.decryptPassword)(body.password));
    const account = new account_1.default({
        username: body.username,
        password: password,
        role: body.role,
        personalInfo: body.personalInfo,
        contactInfo: body.contactInfo,
        url: body.url
    });
    const newAccount = yield account.save();
    console.log('sign up success');
    res.json({ status: true, data: newAccount });
});
exports.addAccount = addAccount;
const updateAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id }, body } = req;
    const _Id = new mongoose_1.default.Types.ObjectId(id);
    const updatedAccount = yield account_1.default.findByIdAndUpdate({ _id: _Id }, body);
    if (!updatedAccount)
        throw new error_1.BadRequestError({ message: 'Account not found!' });
    const allAccounts = yield account_1.default.find();
    res.status(200)
        .json({ message: "Account updated", account: updatedAccount, accounts: allAccounts });
});
exports.updateAccount = updateAccount;
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _Id = new mongoose_1.default.Types.ObjectId(req.params.id);
    const deletedAccount = yield account_1.default.findByIdAndDelete(_Id);
    const allAccounts = yield account_1.default.find();
    res.status(200)
        .json({ message: "Account deleted", account: deletedAccount, accounts: allAccounts });
});
exports.deleteAccount = deleteAccount;
