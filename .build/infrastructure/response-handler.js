"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var responseHandler = function (body, statusCode, headers) {
    if (statusCode === void 0) { statusCode = 200; }
    if (headers === void 0) { headers = {}; }
    return {
        body: JSON.stringify(body),
        headers: __assign({ 'Access-Control-Allow-Origin': '*' }, headers),
        statusCode: statusCode,
    };
};
exports.responseHandler = responseHandler;
//# sourceMappingURL=response-handler.js.map