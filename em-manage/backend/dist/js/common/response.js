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
exports.serverErrorResponse = exports.failureResponse = exports.successResponse = void 0;
const successResponse = (res, data) => {
    res.json({ success: true, data });
};
exports.successResponse = successResponse;
const failureResponse = (res, _a = {}) => {
    var payload = __rest(_a, []);
    res.json(Object.assign({ success: false }, payload));
};
exports.failureResponse = failureResponse;
const serverErrorResponse = (res, status, _a = {}) => {
    var payload = __rest(_a, []);
    res.status(status).json(Object.assign({ success: false }, payload));
};
exports.serverErrorResponse = serverErrorResponse;
