import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleService } from './role.service';
import { Role, RoleSchema } from './schemas/role.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Role.name, schema: RoleSchema
    }], "auth")
  ],
  providers: [RoleService],
  exports: [RoleService]
})
export class RolesModule {}
