import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { OTPModule } from './otp/otp.module';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from './app-config/app-config.module';
import configuration from 'config/configuration';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    MongooseModule.forRoot("mongodb://localhost:27017/core", {
      connectionName: "core"
    }),
    MongooseModule.forRoot("mongodb://localhost:27017/auth", {
      connectionName: "auth"
    }),
    MongooseModule.forRoot("mongodb://localhost:27017/conf", {
      connectionName: "conf"
    }),
    UsersModule,
    AuthModule,
    OTPModule,
    AppConfigModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
    /*, AppConfigService */
    ],
})
export class AppModule {};
