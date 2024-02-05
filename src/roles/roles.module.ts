import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesService } from './roles.service';
import { Role, RoleSchema } from './schemas/roles.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Role.name, schema: RoleSchema
    }], "auth")
  ],
  providers: [RolesService],
  exports: [RolesService]
})
export class RolesModule {}
