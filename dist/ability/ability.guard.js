"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbilitiesGuard = void 0;
const ability_1 = require("@casl/ability");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const abilities_decorator_1 = require("./abilities.decorator");
const ability_factory_1 = require("./ability.factory");
let AbilitiesGuard = class AbilitiesGuard {
    constructor(reflector, caslAbilityFactory) {
        this.reflector = reflector;
        this.caslAbilityFactory = caslAbilityFactory;
    }
    async canActivate(context) {
        const rules = this.reflector.get(abilities_decorator_1.CHECK_ABILITY, context.getHandler()) ||
            [];
        const { user } = context.switchToHttp().getRequest();
        const ability = this.caslAbilityFactory.defineAbility(user);
        try {
            return true;
        }
        catch (error) {
            if (error instanceof ability_1.ForbiddenError) {
                throw new common_1.ForbiddenException(error.message);
            }
        }
    }
};
AbilitiesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        ability_factory_1.AbilityFactory])
], AbilitiesGuard);
exports.AbilitiesGuard = AbilitiesGuard;
//# sourceMappingURL=ability.guard.js.map