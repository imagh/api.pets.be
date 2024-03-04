import { SetMetadata } from "@nestjs/common";
import { Role } from "../enums/role.enum";

export const ROLES_KEY = 'permissions';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);