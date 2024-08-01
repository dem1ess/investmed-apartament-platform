import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { hash, verify } from 'argon2'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import * as westwallet from 'westwallet-api'
import * as westwalletErrors from 'westwallet-api/lib/errors'
import { MailService } from '../email/MailService'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private userService: UserService,
    private mailService: MailService,
    private prisma: PrismaService
  ) {}

  async register(dto: AuthDto) {
    const oldUser = await this.userService.getByEmail(dto.email)

    if (oldUser) throw new BadRequestException('User already exists')

    const hashedPassword = await hash(dto.password)
    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: hashedPassword,
        role: 'USER', // Значение по умолчанию для роли
        balance: 0, // Значение по умолчанию для баланса
        isEmailVerif: false, // Значение по умолчанию для проверки почты
        isVerif: false, // Значение по умолчанию для проверки
        firstName: '', // Значение по умолчанию для имени
        lastName: '', // Значение по умолчанию для фамилии
        country: '', // Значение по умолчанию для страны
        documentPhoto1Url: '', // Значение по умолчанию для первой фотографии документа
        documentPhoto2Url: '', // Значение по умолчанию для второй фотографии документа
        selfieUrl: '' // Значение по умолчанию для селфи
      }
    })

    // Генерация адреса кошелька
    const client = new westwallet.WestWalletAPI(
      process.env.PUBLIC_WEST_KEY,
      process.env.PRIVATE_WEST_KEY
    )

    let walletAddress
    try {
      const data = await client.generateAddress('USDTTRC')
      console.log(data)
      walletAddress = data.address
    } catch (error) {
      if (error instanceof westwalletErrors.CurrencyNotFoundError) {
        console.log('No such currency')
      } else {
        throw error
      }
    }

    // Обновление адреса кошелька в базе данных
    if (walletAddress) {
      await this.prisma.user.update({
        where: { id: newUser.id },
        data: { wallet: walletAddress }
      })
    }

    const token = await this.generateToken(newUser)

    // Отправка письма с подтверждением
    const emailToken = await this.generateEmailToken(newUser.id)
    await this.mailService.sendEmailVerification(newUser.email, emailToken)

    return {
      user: newUser,
      token
    }
  }

  async generateEmailToken(userId: string): Promise<string> {
    const payload = { id: userId }
    return this.jwt.sign(payload, { expiresIn: '1d' })
  }

  async verifyEmail(token: string) {
    try {
      const payload = this.jwt.verify(token)
      const user = await this.prisma.user.update({
        where: { id: payload.id },
        data: { isEmailVerif: true }
      })
      console.log('Email verified successfully')
      return user
    } catch (e) {
      throw new BadRequestException(
        'Invalid or expired email verification token'
      )
    }
  }

  async requestPasswordReset(email: string) {
    const user = await this.userService.getByEmail(email)
    if (!user) throw new NotFoundException('User not found')

    const token = await this.generateEmailToken(user.id)
    await this.mailService.sendPasswordReset(email, token)

    return { message: 'Password reset email sent' }
  }

  async resetPassword(
    token: string,
    newPassword: string
  ): Promise<{ message: string }> {
    try {
      const payload = this.jwt.verify(token)
      const user = await this.prisma.user.findUnique({
        where: { id: payload.id }
      })
      if (!user) throw new NotFoundException('User not found')

      const hashedPassword = await hash(newPassword)

      await this.prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      })

      return { message: 'Password reset successfully' }
    } catch (e) {
      throw new BadRequestException('Invalid or expired reset token')
    }
  }

  async removeRefreshTokenToResponse() {
    return null
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto)
    const token = await this.generateToken(user)

    return {
      user,
      token
    }
  }

  async generateToken(user: any): Promise<string> {
    const payload = {
      id: user.id,
      role: user.role,
      balance: user.balance,
      country: user.country,
      documentPhoto1Url: user.documentPhoto1Url,
      documentPhoto2Url: user.documentPhoto2Url,
      isVerif: user.isVerif,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      documentType: user.documentType,
      selfieUrl: user.selfieUrl,
      wallet: user.wallet,
      isEmailVerif: user.isEmailVerif
    }
    return this.jwt.sign(payload, { expiresIn: '1h' })
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email)

    if (!user) throw new NotFoundException('User not found')

    const isValid = await verify(user.password, dto.password)
    if (!isValid) throw new UnauthorizedException('Invalid password')

    return user
  }
}
