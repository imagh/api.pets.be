import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./decorators/roles.decorator";
import { Role } from "./enums/roles.enum";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRoles = this.reflector
			.getAllAndOverride<Role[]>(ROLES_KEY, [
				context.getHandler(),
				context.getClass()
			]);
		if (!requiredRoles) {
			return true;
		}
		const { user } = context.switchToHttp().getRequest();
		return requiredRoles.every(role => user.roles?.includes(role));
	}
}