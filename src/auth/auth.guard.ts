import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { SKIP_AUTH } from "src/decorators/skip-auth.decorator";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
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
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token);
            if (payload.expiry < Date.now()) {
                throw new UnauthorizedException();
            }
            let user = await this.usersService.findById(payload.sub);
            if (!user) {
                throw new UnauthorizedException();
            }
            request['user'] = { id: payload.sub };
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