import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Request,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { JwtAuthGuard } from './guards/jwt.guard'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private prisma: PrismaService
  ) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto)
  }

  @HttpCode(200)
  @Post('logout')
  async logout() {
    return true
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    const userId = req.user.id
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    })
    console.log(user)
    return user
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string, @Res() res) {
    try {
      await this.authService.verifyEmail(token)
      // Отправляем успешную страницу подтверждения с параметром success=true
      return res.redirect(
        'http://localhost:5173/email-verification?success=true'
      ) // Замените URL на ваш URL для клиентской страницы
    } catch (e) {
      console.error(e)
      // Отправляем страницу с ошибкой с параметром success=false
      return res.redirect(
        'http://localhost:5173/email-verification?success=false'
      ) // Замените URL на вашу страницу с ошибкой
    }
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('request-password-reset')
  async requestPasswordReset(@Body() body: { email: string }) {
    return this.authService.requestPasswordReset(body.email)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Query('token') token: string,
    @Res() res
  ) {
    try {
      await this.authService.resetPassword(token, resetPasswordDto.newPassword)
      console.log('Password reset successfully')
      return res.redirect('http://localhost:5173/reset-password?success=true')
    } catch (e) {
      console.error(e)
      console.log(e)
      return res.redirect('http://localhost:5173/reset-password?success=false')
    }
  }
}
