import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    signup(email: string, password: string): Promise<User>;
    signin(email: string, password: string): Promise<User>;
    getTokenForUser(user: User): string;
    hashPassword(password: string): Promise<string>;
}
