import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { User } from './user.entity';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { SignInUserDto } from './dtos/signin-user-dto';
export declare class UsersController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    createUser(body: CreateUserDto): Promise<User>;
    changePassword(user: User, body: ChangePasswordDto): Promise<void>;
    signin(body: SignInUserDto, session: any): Promise<{
        token: string;
        id: number;
        name: string;
        email: string;
        password: string;
        phone_number: string;
        address: string;
        orders: import("../order/order.entity").Order[];
        reports: import("../reports/report.entity").Report[];
    }>;
    signOut(session: any): void;
    whoAmI(user: User): User;
    findUser(id: string): Promise<User>;
    findAllUsers(email: string): Promise<User[]>;
    removeUser(id: string): Promise<User>;
    update(id: string, body: UpdateUserDto): Promise<User>;
}
