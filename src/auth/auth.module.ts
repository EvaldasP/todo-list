import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { UserSchema } from '../users/users.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { LoginQueryHandler } from './queries/login.query';

const queryHandlers = [LoginQueryHandler];

@Module({
  imports: [
    PassportModule,
    UsersModule,
    CqrsModule,
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '3600s' },
        };
      },
    }),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, ...queryHandlers],
  controllers: [AuthController],
})
export class AuthModule {}
