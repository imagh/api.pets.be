import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from 'src/app-config/app-config.module';
import { AppConfigService } from 'src/app-config/app-config.service';
import { Token, TokenSchema } from './schemas/token.schema';
import { TokensService } from './tokens.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Token.name, schema: TokenSchema
    }], "auth"),
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
  providers: [TokensService],
  exports: [TokensService]
})
export class TokenModule {}
