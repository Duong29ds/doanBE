import { Strategy } from 'passport-local';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly repo;
    private readonly logger;
    constructor(repo: Repository<User>);
    validate(username: string, password: string): Promise<any>;
}
export {};
