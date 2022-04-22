"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.verifyRefreshTokenMiddleware = exports.verifyTokenMiddleware = exports.verifyCredentials = exports.signCredentials = void 0;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const error_1 = require("../common/error");
const auth_1 = require("../controllers/auth");
const errorHandling_1 = require("./errorHandling");
const signCredentials = (args) => {
    const { credentials, type = 'accessToken' } = args;
    const secret = type === 'accessToken' ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET;
    const expiresIn = type === 'accessToken' ? 600 : 60 * 60 * 24 * 7;
    const nonce = crypto_1.default.randomBytes(6).toString('hex');
    return jsonwebtoken_1.default.sign(Object.assign({ nonce }, credentials), secret, { expiresIn });
};
exports.signCredentials = signCredentials;
const verifyCredentials = (args) => {
    try {
        const { token, type = 'accessToken' } = args;
        const secret = type === 'accessToken' ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET;
        const credentials = jsonwebtoken_1.default.verify(token, secret);
        return credentials;
    }
    catch (e) {
        if (e instanceof jsonwebtoken_1.JsonWebTokenError) {
            if (e instanceof jsonwebtoken_1.TokenExpiredError) {
                throw new error_1.UnauthorizedError({ message: 'Token Expired', data: -1 });
            }
            throw new error_1.UnauthorizedError();
        }
        throw e;
    }
};
exports.verifyCredentials = verifyCredentials;
exports.verifyTokenMiddleware = (0, errorHandling_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    let token;
    if (authHeader) {
        const [tokenType, _token] = authHeader.split(' ');
        if (tokenType.toLocaleLowerCase() !== 'bearer' || !_token)
            throw new error_1.UnauthorizedError({ message: 'Invalid Token' });
        token = _token;
    }
    else {
        const _token = req.cookies['x-access-token'];
        if (!_token)
            throw new error_1.UnauthorizedError({ message: 'Invalid Token' });
        token = _token;
    }
    const credentials = (0, exports.verifyCredentials)({ token, type: 'accessToken' });
    if (!credentials)
        throw new error_1.UnauthorizedError({ message: 'Invalid Token' });
    const savedToken = yield (0, auth_1.getAccessToken)({ accountID: credentials.accountID });
    if (!savedToken || savedToken !== token)
        throw new error_1.UnauthorizedError({ message: 'Invalid Token' });
    req.credentials = credentials;
    return next();
}));
exports.verifyRefreshTokenMiddleware = (0, errorHandling_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.body.refresh_token;
    if (!token) {
        const _token = req.cookies['x-refresh-token'];
        if (!_token)
            throw new error_1.UnauthorizedError({ message: 'Invalid Token' });
        token = _token;
    }
    const credentials = (0, exports.verifyCredentials)({ token, type: 'refreshToken' });
    if (!credentials)
        throw new error_1.UnauthorizedError({ message: 'Invalid Token' });
    const savedToken = yield (0, auth_1.getRefreshToken)({ accountID: credentials.accountID });
    if (!savedToken || savedToken !== token)
        throw new error_1.UnauthorizedError({ message: 'Invalid Token' });
    req.credentials = credentials;
    return next();
}));
