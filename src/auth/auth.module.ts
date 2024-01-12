import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { OTPModule } from 'src/otp/otp.module';
import { Auth, AuthSchema } from './schemas/auth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }], "auth"),
    UsersModule,
    OTPModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
