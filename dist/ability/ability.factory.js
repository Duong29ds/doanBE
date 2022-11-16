"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbilityFactory = exports.Action = void 0;
const ability_1 = require("@casl/ability");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../users/user.entity");
var Action;
(function (Action) {
    Action["Manage"] = "manage";
    Action["Create"] = "create";
    Action["Read"] = "read";
    Action["Update"] = "update";
    Action["Delete"] = "delete";
})(Action = exports.Action || (exports.Action = {}));
let AbilityFactory = class AbilityFactory {
    defineAbility(user) {
        const { can, cannot, build } = new ability_1.AbilityBuilder(ability_1.Ability);
        if (user.isAdmin) {
            can(Action.Manage, 'all');
            cannot(Action.Manage, user_entity_1.User, { orgId: { $ne: user.orgId } });
        }
        else {
            can(Action.Read, user_entity_1.User);
            cannot(Action.Delete, user_entity_1.User).because('you just can');
        }
        return build({
            detectSubjectType: (item) => item.constructor,
        });
    }
};
AbilityFactory = __decorate([
    (0, common_1.Injectable)()
], AbilityFactory);
exports.AbilityFactory = AbilityFactory;
//# sourceMappingURL=ability.factory.js.map