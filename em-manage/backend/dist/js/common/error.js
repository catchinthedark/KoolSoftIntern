"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.ServerError = void 0;
class ServerError extends Error {
    constructor(args) {
        var _a, _b;
        super();
        this.status = (_a = args.status) !== null && _a !== void 0 ? _a : 200;
        this.message = (_b = args.message) !== null && _b !== void 0 ? _b : '';
        this.data = args.data;
    }
}
exports.ServerError = ServerError;
class BadRequestError extends ServerError {
    constructor(_a = {}) {
        var payload = __rest(_a, []);
        super(Object.assign({ status: 400, message: 'BadRequest' }, payload));
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends ServerError {
    constructor(_a = {}) {
        var payload = __rest(_a, []);
        super(Object.assign({ status: 401, message: 'Unauthorized' }, payload));
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends ServerError {
    constructor(_a = {}) {
        var payload = __rest(_a, []);
        super(Object.assign({ status: 403, message: 'Forbidden' }, payload));
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends ServerError {
    constructor(_a = {}) {
        var payload = __rest(_a, []);
        super(Object.assign({ status: 404, message: 'Not Found' }, payload));
    }
}
exports.NotFoundError = NotFoundError;
class InternalServerError extends ServerError {
    constructor(_a = {}) {
        var payload = __rest(_a, []);
        super(Object.assign({ status: 500, message: 'Internal Server Error' }, payload));
    }
}
exports.InternalServerError = InternalServerError;
