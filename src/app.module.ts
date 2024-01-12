import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { OTPModule } from './otp/otp.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/core", {
      connectionName: "core"
    }),
    MongooseModule.forRoot("mongodb://localhost:27017/auth", {
      connectionName: "auth"
    }),
    UsersModule,
    AuthModule,
    OTPModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {};
