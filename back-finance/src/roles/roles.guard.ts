import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass()
    ])
    if (!requiredRoles) {
      return true // Если роли не требуются, разрешаем доступ
    }
    const request = context.switchToHttp().getRequest()
    const authHeader = request.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization header is missing or invalid'
      )
    }
    const token = authHeader.split(' ')[1]
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET') // Убедитесь, что здесь используется правильный ключ
      })
      // Проверяем роли пользователя и возвращаем true, если пользователь имеет необходимые роли
      return requiredRoles.some(role => payload.role === role)
    } catch (error) {
      throw new UnauthorizedException('Invalid token')
    }
  }
}
