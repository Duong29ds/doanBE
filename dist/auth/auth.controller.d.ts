import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(user: User): Promise<{
        userId: number;
        token: string;
    }>;
    getProfile(user: User): Promise<User>;
}
