import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigSchema } from './schemas/app-config.schema';
import { ConfigService } from '@nestjs/config';
import { AppConfigService } from './app-config.service';

@Global()
@Module({
    imports: [
      MongooseModule.forFeature([{
        name: "AppConfig", schema: AppConfigSchema
      }], "conf")
    ],
    providers: [AppConfigService],
    exports: [AppConfigService]
})
export class AppConfigModule {}