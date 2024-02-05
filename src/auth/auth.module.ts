import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { OTPModule } from 'src/otp/otp.module';
import { Auth, AuthSchema } from './schemas/auth.schema';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from 'src/app-config/app-config.module';
import { AppConfigService } from 'src/app-config/app-config.service';
import { RolesModule } from 'src/roles/roles.module';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Auth.name, schema: AuthSchema
    }], "auth"),
    UsersModule,
    RolesModule,
    OTPModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      global: true,
      useFactory: async (appConfigService: AppConfigService) => {
        return {
          secret: (await appConfigService.get('auth')).jwt.secret
        }
      },
      inject: [AppConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
