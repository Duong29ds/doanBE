import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
export declare class AuthService {
    private readonly jwtService;
    private readonly usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    signup(body: CreateUserDto): Promise<User>;
    signin(email: string, password: string): Promise<User>;
    getTokenForUser(user: User): string;
    hashPassword(password: string): Promise<string>;
}
