import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '../user.entity';
import { JwtService } from '@nestjs/jwt';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const payload = this.jwtService.decode(token);

    const userId = +payload.sub;

    if (userId) {
      const user = await this.usersService.findOne(userId);
      req.user = user;
    }

    next();
  }
}
