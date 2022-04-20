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
exports.getMe = exports.logout = exports.login = void 0;
const account_1 = __importDefault(require("../../models/account"));
const error_1 = require("../../common/error");
const auth_1 = require("../../middlewares/auth");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const account = yield account_1.default.findOne({ username: body.username });
    if (!account)
        throw new error_1.ServerError({ data: -1 });
    const result = yield (0, auth_1.comparePassword)(account.password, (0, auth_1.decryptPassword)(body.password));
    if (!result)
        throw new error_1.ServerError({ data: -1 });
    console.log('login success');
    res.cookie('isLogin', true);
    res.cookie('username', account.username);
    res.send({ data: body.username, status: true });
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie('isLogin', false);
    res.cookie('username', '');
    console.log('logout success');
    res.send({ message: 'logout success', status: true });
});
exports.logout = logout;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield account_1.default.findOne({ username: req.params.username });
    if (!account)
        throw new error_1.ServerError({ data: -1 });
    res.send({ data: account, status: true });
});
exports.getMe = getMe;
