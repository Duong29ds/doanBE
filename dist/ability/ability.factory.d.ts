import { Ability, InferSubjects } from '@casl/ability';
import { User } from '../users/user.entity';
export declare enum Action {
    Manage = "manage",
    Create = "create",
    Read = "read",
    Update = "update",
    Delete = "delete"
}
export declare type Subjects = InferSubjects<typeof User> | 'all';
export declare type AppAbility = Ability<[Action, Subjects]>;
export declare class AbilityFactory {
    defineAbility(user: User): AppAbility;
}
