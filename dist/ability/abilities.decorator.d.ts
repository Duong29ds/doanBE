import { Action, Subjects } from './ability.factory';
export interface RequiredRule {
    action: Action;
    subject: Subjects;
}
export declare const CHECK_ABILITY = "check_ability";
export declare const CheckAbilities: (...requirements: RequiredRule[]) => import("@nestjs/common").CustomDecorator<string>;
