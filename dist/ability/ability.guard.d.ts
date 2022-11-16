import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityFactory } from './ability.factory';
export declare class AbilitiesGuard implements CanActivate {
    private reflector;
    private caslAbilityFactory;
    constructor(reflector: Reflector, caslAbilityFactory: AbilityFactory);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
