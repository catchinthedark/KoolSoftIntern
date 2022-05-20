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
exports.getRefreshToken = exports.getAccessToken = exports.refreshToken = exports.register = exports.logout = exports.login = void 0;
const account_1 = __importDefault(require("../../models/account"));
const profile_1 = __importDefault(require("../../models/profile"));
const accountToken_1 = __importDefault(require("../../models/accountToken"));
const error_1 = require("../../common/error");
const auth_1 = require("../../middlewares/auth");
const response_1 = require("../../common/response");
const jwtHelper_1 = require("../../middlewares/jwtHelper");
const profile_2 = require("../profile");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const account = yield account_1.default.findOne({ username: body.username });
    if (account === null)
        return (0, response_1.failureResponse)(res, { data: { message: "can't find account with this username" } });
    const result = yield (0, auth_1.comparePassword)(account.password, (0, auth_1.decryptPassword)(body.password));
    if (result === null)
        return (0, response_1.failureResponse)(res, { data: { message: "wrong password" } });
    const profile = yield profile_1.default.findOne({ accountID: account._id });
    const accessToken = (0, jwtHelper_1.signCredentials)({ credentials: { accountID: account._id, role: account.role } });
    const refreshToken = (0, jwtHelper_1.signCredentials)({ credentials: { accountID: account._id, role: account.role }, type: 'refreshToken' });
    yield accountToken_1.default.findOneAndUpdate({ accountID: account._id }, { $set: { accessToken, refreshToken } }).exec();
    const response = {
        account: account,
        profile: profile
    };
    const cookieOptions = { httpOnly: true };
    res.cookie('x-access-token', accessToken, Object.assign({}, cookieOptions /*, maxAge: 1000 * 60 * 60 * 24 * 365*/));
    res.cookie('x-refresh-token', refreshToken, Object.assign({}, cookieOptions /*, maxAge: 1000 * 60 * 60 * 24 * 365*/));
    res.cookie('isLogin', true);
    console.log('login success');
    return (0, response_1.successResponse)(res, response);
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const credentials = req.credentials;
    if (credentials) {
        const accountID = credentials.accountID;
        yield accountToken_1.default.findOneAndUpdate({ accountID }, { $set: { accessToken: null, refreshToken: null } }, { new: true });
    }
    res.clearCookie('x-access-token');
    res.clearCookie('x-refresh-token');
    res.cookie('isLogin', false);
    console.log('logout success');
    return (0, response_1.successResponse)(res);
});
exports.logout = logout;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const foundAccount = yield account_1.default.findOne({ "personalInfo.firstName": body.personalInfo.firstName, "personalInfo.lastName": body.personalInfo.lastName, "contactInfo.email": body.contactInfo.email });
    if (foundAccount)
        throw new error_1.ServerError({ data: -2 });
    let lastname = '';
    const text = body.personalInfo.lastName.split(' ');
    for (const txt of text) {
        lastname = lastname + txt.substring(0, 1);
    }
    const username = (body.personalInfo.firstName + lastname + body.contactInfo.phone.substring(7, 9)).toLowerCase();
    const password = yield (0, auth_1.encryptPassword)((0, auth_1.decryptPassword)(body.password));
    const account = new account_1.default({
        username: username,
        password: password,
        role: body.role,
        personalInfo: body.personalInfo,
        contactInfo: body.contactInfo,
        url: body.url
    });
    const newAccount = yield account.save();
    const profile = yield (0, profile_2.addProfile)(newAccount);
    const accountToken = new accountToken_1.default({
        accountID: account._id
    });
    const newAccountToken = yield accountToken.save();
    const response = {
        accountID: account._id,
        role: account.role,
        username: account.username
    };
    return (0, response_1.successResponse)(res, response);
});
exports.register = register;
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const credentials = req.credentials;
    const accessToken = yield (0, exports.getRefreshToken)({ accountID: credentials === null || credentials === void 0 ? void 0 : credentials.accountID });
    const cookieOptions = { httpOnly: true };
    res.cookie('x-access-token', accessToken, Object.assign({}, cookieOptions /*, maxAge: 1000 * 60 * 60 * 24 * 365*/));
    return (0, response_1.successResponse)(res);
});
exports.refreshToken = refreshToken;
const getAccessToken = (args) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const accountToken = yield accountToken_1.default.findOne({ accountID: args.accountID });
    return (_a = accountToken === null || accountToken === void 0 ? void 0 : accountToken.get("accessToken")) !== null && _a !== void 0 ? _a : '';
});
exports.getAccessToken = getAccessToken;
const getRefreshToken = (args) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const accountToken = yield accountToken_1.default.findOne({ accountID: args.accountID });
    return (_b = accountToken === null || accountToken === void 0 ? void 0 : accountToken.get("refreshToken")) !== null && _b !== void 0 ? _b : '';
});
exports.getRefreshToken = getRefreshToken;
