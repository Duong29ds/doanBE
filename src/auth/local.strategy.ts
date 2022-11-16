import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy } from 'passport-local';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {
    super({ usernameField: 'email' });
  }

  public async validate(username: string, password: string): Promise<any> {
    const user = await this.repo.findOne({ where: { email: username } });

    if (!user) {
      this.logger.debug(`User ${username} not found!`);
      throw new UnauthorizedException();
    }

    if (!(await bcrypt.compare(password, user.password))) {
      this.logger.debug(`Invalid credentials for user ${username}`);
      throw new UnauthorizedException();
    }

    return user;
  }
}
