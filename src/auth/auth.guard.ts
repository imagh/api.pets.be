import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { SKIP_AUTH } from "src/decorators/skip-auth.decorator";
import { Role } from "src/roles/enums/roles.enum";
import { RolesService } from "src/roles/roles.service";
import { UsersService } from "src/users/users.service";
import { TokensService } from "src/tokens/tokens.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
        private readonly tokensService: TokensService,
        private readonly rolesService: RolesService,
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
            const token = await this.tokensService.findOne({ access_token });
            if (!token) {
                throw new UnauthorizedException();
            }
            const payload = await this.jwtService.verifyAsync(access_token);
            if (payload.expiry < Date.now()) {
                throw new UnauthorizedException();
            }
            let user = await this.usersService.findById(token.userId);
            if (!user) {
                throw new UnauthorizedException();
            }
            const roles = await this.rolesService.findByQuery({ userId: token.userId });
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