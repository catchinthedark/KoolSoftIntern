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
exports.decryptPassword = exports.comparePassword = exports.enncryptPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_js_1 = require("crypto-js");
const enncryptPassword = (plainPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashPassword = yield bcrypt_1.default.hash(plainPassword, salt);
    return hashPassword;
});
exports.enncryptPassword = enncryptPassword;
const comparePassword = (hashPassword, plainPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield bcrypt_1.default.compare(plainPassword, hashPassword);
    return res;
});
exports.comparePassword = comparePassword;
const decryptPassword = (encryptedPassword) => {
    return crypto_js_1.AES.decrypt(encryptedPassword, `${process.env.ENCRYPTED_KEY}`).toString();
};
exports.decryptPassword = decryptPassword;
