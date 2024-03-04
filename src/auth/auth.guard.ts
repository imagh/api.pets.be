import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { SKIP_AUTH } from "src/decorators/skip-auth.decorator";
import { Role } from "src/role/enums/role.enum";
import { RoleService } from "src/role/role.service";
import { UserService } from "src/user/user.service";
import { TokenService } from "src/token/token.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
        private readonly roleService: RoleService,
        private reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH, [
            context.getHandler(),
            context.getClass()
        ]);
        if (skipAuth) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const access_token = this.extractTokenFromHeader(request);
        if (!access_token) {
            if (skipAuth) {
                return true;
            }
            throw new UnauthorizedException();
        }
        try {
            // TODO: Verify token against DB
            const token = await this.tokenService.findOne({ access_token });
            if (!token) {
                throw new UnauthorizedException();
            }
            const payload = await this.jwtService.verifyAsync(access_token);
            if (payload.expiry < Date.now()) {
                throw new UnauthorizedException();
            }
            let user = await this.userService.findById(token.userId);
            if (!user) {
                throw new UnauthorizedException();
            }
            const roles = await this.roleService.findByQuery({ userId: token.userId });
            request['user'] = {
                id: token.userId,
                access_token,
                roles: (roles || []).map(e => e.role).concat([ Role.User ])
            };
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
    
}