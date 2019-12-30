"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Team_1 = require("./Team");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], User.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 150, nullable: false })
    ], User.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 150, nullable: false }),
        typeorm_1.Index('email_UNIQUE', { unique: true })
    ], User.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column({ type: 'enum', enum: ['user', 'admin'], nullable: false, default: 'user' })
    ], User.prototype, "type", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Team_1.Team; }, function (team) { return team.users; })
    ], User.prototype, "team", void 0);
    __decorate([
        typeorm_1.Column({ type: 'integer', name: 'team_id' })
    ], User.prototype, "teamId", void 0);
    User = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map