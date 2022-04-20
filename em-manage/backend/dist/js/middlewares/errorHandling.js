"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.notFoundHandler = exports.errorHandler = void 0;
const error_1 = require("../common/error");
const response_1 = require("../common/response");
const errorHandler = (err, req, res, next) => {
    if (err) {
        if (err instanceof error_1.ServerError) {
            const { status, message, data } = err;
            if (status === 200)
                return (0, response_1.failureResponse)(res, { message, data });
            return (0, response_1.serverErrorResponse)(res, status, { message, data });
        }
        console.error('[ERROR]', err);
        return (0, response_1.serverErrorResponse)(res, 500, { message: 'Internal Server Error' });
    }
    return next();
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, res, next) => {
    (0, response_1.serverErrorResponse)(res, 404, { message: `Endpoint ${req.method} ${req.url} not found` });
    return next();
};
exports.notFoundHandler = notFoundHandler;
const asyncHandler = (fn) => {
    return (req, res, next) => fn(req, res, next).catch(next);
};
exports.asyncHandler = asyncHandler;
