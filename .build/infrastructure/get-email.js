"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getEmail = function (event) {
    if (process.env.IS_OFFLINE) {
        return 'example@email.com';
    }
    else {
        return event.requestContext.authorizer.claims.email;
    }
};
exports.getEmail = getEmail;
//# sourceMappingURL=get-email.js.map