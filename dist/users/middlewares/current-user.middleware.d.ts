/// <reference types="passport" />
import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { JwtService } from '@nestjs/jwt';
declare global {
    namespace Express {
        interface Request {
            currentUser?: User;
        }
    }
}
export declare class CurrentUserMiddleware implements NestMiddleware {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
