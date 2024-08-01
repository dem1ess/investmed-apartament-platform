import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { User } from '@prisma/client'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { Roles } from 'src/roles/roles.decorator'
import { RolesGuard } from 'src/roles/roles.guard'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: AuthDto) {
    return this.userService.create(dto)
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto)
  }

  @Put(':id/verify')
  async toggleVerification(
    @Param('id') id: string,
    @Body('isVerif') isVerif: boolean
  ) {
    try {
      await this.userService.toggleVerification(id, isVerif)
      return { message: 'User verification status updated successfully' }
    } catch (error) {
      throw new Error('Failed to update user verification status')
    }
  }

  @Get(':id')
  async getProfileId(@Param('id') id: string) {
    return this.userService.getProfileId(id)
  }

  @Get('check')
  async checkAuth(@Request() req) {
    return req.user
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async findAll(): Promise<User[]> {
    return this.userService.findAll()
  }
}
