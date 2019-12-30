"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var InternalServerError = /** @class */ (function (_super) {
    __extends(InternalServerError, _super);
    function InternalServerError() {
        var _this = _super.call(this, 'Internal server error!') || this;
        _this.statusCode = 500;
        return _this;
    }
    return InternalServerError;
}(Error));
exports.InternalServerError = InternalServerError;
var ForbiddenError = /** @class */ (function (_super) {
    __extends(ForbiddenError, _super);
    function ForbiddenError() {
        var _this = _super.call(this, 'Forbidden!') || this;
        _this.statusCode = 403;
        return _this;
    }
    return ForbiddenError;
}(Error));
exports.ForbiddenError = ForbiddenError;
//# sourceMappingURL=errors.js.map