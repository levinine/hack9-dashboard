"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("./errors");
var errorHandler = function (error) {
    if (!error.statusCode && !error.message) {
        error = new errors_1.InternalServerError();
    }
    return {
        body: JSON.stringify({ name: error.name, message: error.message }),
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        statusCode: error.statusCode || 500
    };
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map