import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from 'src/user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Установите значение в false, чтобы включить проверку срока действия токена
      secretOrKey: configService.get('JWT-TOKEN') // Используйте правильное имя переменной среды для секрета JWT
    })
  }

  async validate(payload: { id: string }) {
    const user = await this.userService.getById(payload.id)
    if (!user) {
      return null
    }
    // Включите роль пользователя в возвращаемый объект
    return {
      id: user.id,
      role: user.role,
      balance: user.balance,
      verify: user.isVerif,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      documentType: user.documentType,
      country: user.country,
      documentPhoto1Url: user.documentPhoto1Url,
      documentPhoto2Url: user.documentPhoto2Url
    }
  }
}
