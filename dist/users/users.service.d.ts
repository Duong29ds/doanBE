import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
export declare class UsersService {
    private repo;
    constructor(repo: Repository<User>);
    create(body: CreateUserDto): Promise<User>;
    changePassword(id: number, password: string): Promise<User>;
    findOne(id: number): Promise<User>;
    find(email: string): Promise<User[]>;
    update(id: number, attrs: Partial<User>): Promise<User>;
    remove(id: number): Promise<User>;
}
