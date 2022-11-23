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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dtos/create-user.dto");
const update_user_dto_1 = require("./dtos/update-user.dto");
const users_service_1 = require("./users.service");
const auth_service_1 = require("../auth/auth.service");
const user_dto_1 = require("./dtos/user.dto");
const serialize_interceptor_1 = require("../interceptors/serialize.interceptor");
const current_user_decorator_1 = require("../users/decorators/current-user.decorator");
const user_entity_1 = require("./user.entity");
const auth_guard_jwt_1 = require("../auth/auth-guard.jwt");
const change_password_dto_1 = require("./dtos/change-password.dto");
const bcrypt = __importStar(require("bcrypt"));
const abilities_decorator_1 = require("../ability/abilities.decorator");
const ability_factory_1 = require("../ability/ability.factory");
const ability_guard_1 = require("../ability/ability.guard");
const signin_user_dto_1 = require("./dtos/signin-user-dto");
let UsersController = class UsersController {
    constructor(usersService, authService) {
        this.usersService = usersService;
        this.authService = authService;
    }
    async createUser(body) {
        const user = await this.authService.signup(body);
        console.log(user);
        return user;
    }
    async changePassword(user, body) {
        if (!(await bcrypt.compare(body.password, user.password))) {
            throw new common_1.BadRequestException('Password not correct!!');
        }
        else {
            if (body.newPassword === body.retypeNewPassword) {
                const hashPassword = await this.authService.hashPassword(body.newPassword);
                this.usersService.changePassword(user.id, hashPassword);
            }
            else {
                throw new common_1.BadRequestException('RetypePassword is wrong!');
            }
        }
    }
    async signin(body, session) {
        const user = await this.authService.signin(body.email, body.password);
        const token = this.authService.getTokenForUser(user);
        const res = Object.assign(Object.assign({}, user), { token });
        return res;
    }
    signOut(session) {
        session.userId = null;
    }
    whoAmI(user) {
        return user;
    }
    async findUser(id) {
        const user = await this.usersService.findOne(parseInt(id));
        if (!user) {
            throw new common_1.NotFoundException('user not found');
        }
        return user;
    }
    findAllUsers(email) {
        return this.usersService.find(email);
    }
    removeUser(id) {
        return this.usersService.remove(parseInt(id));
    }
    update(id, body) {
        return this.usersService.update(parseInt(id), body);
    }
};
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('/change-password'),
    (0, common_1.UseGuards)(auth_guard_jwt_1.AuthGuardJwt),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        change_password_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('/signin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_user_dto_1.SignInUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signin", null);
__decorate([
    (0, common_1.Post)('/signout'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "signOut", null);
__decorate([
    (0, common_1.Get)('/whoami'),
    (0, common_1.UseGuards)(auth_guard_jwt_1.AuthGuardJwt, ability_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)({ action: ability_factory_1.Action.Read, subject: user_entity_1.User }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "whoAmI", null);
__decorate([
    (0, serialize_interceptor_1.Serialize)(user_dto_1.UserDto),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findUser", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAllUsers", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "removeUser", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
UsersController = __decorate([
    (0, common_1.Controller)('user'),
    (0, serialize_interceptor_1.Serialize)(user_dto_1.UserDto),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map