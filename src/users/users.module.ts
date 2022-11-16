import { Module, MiddlewareConsumer } from '@nestjs/common';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { AuthModule } from '../auth/auth.module';
import { AbilityModule } from 'src/ability/ability.module';
import { JwtModule } from '@nestjs/jwt';
import { AbilitiesGuard } from 'src/ability/ability.guard';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule, AbilityModule,
  JwtModule.registerAsync({
    useFactory: () => ({
      secret: process.env.AUTH_KEY,
      signOptions: {
        expiresIn: '60m',
      },
    }),
  }),],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: AbilitiesGuard,
    // },
    JwtStrategy
  ],
})
export class UsersModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(CurrentUserMiddleware).forRoutes('*');
  // }
}
