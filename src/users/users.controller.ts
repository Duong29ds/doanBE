import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
  UseGuards,
  BadRequestException,
  Session,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { UserDto } from './dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthGuardJwt } from 'src/auth/auth-guard.jwt';
import { ChangePasswordDto } from './dtos/change-password.dto';
import * as bcrypt from 'bcrypt';
import { CheckAbilities } from 'src/ability/abilities.decorator';
import { Action } from 'src/ability/ability.factory';
import { AbilitiesGuard } from 'src/ability/ability.guard';
// import { AuthGuard } from '../guards/auth.guard';

@Controller('user')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.authService.signup(body.email, body.password);

    console.log(user);

    return user;
  }

  @Post('/change-password')
  @UseGuards(AuthGuardJwt)
  async changePassword(
    @CurrentUser() user: User,
    @Body() body: ChangePasswordDto,
  ) {
    if (!(await bcrypt.compare(body.password, user.password))) {
      throw new BadRequestException('Password not correct!!');
    } else {
      if (body.newPassword === body.retypeNewPassword) {
        const hashPassword = await this.authService.hashPassword(
          body.newPassword,
        );
        this.usersService.changePassword(user.id, hashPassword);
      } else {
        throw new BadRequestException('RetypePassword is wrong!');
      }
    }
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    // session.userId = user.id;
    const token=this.authService.getTokenForUser(user)
    const res={...user,token}
    return res;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get('/whoami')
  @UseGuards(AuthGuardJwt, AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: User })
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  // @UseInterceptors(new SerializeInterceptor(UserDto))
  @Serialize(UserDto)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
