import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJwtConfig } from '../config/jwt.config'

@Module({
  imports: [ConfigModule ,JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: getJwtConfig
  })],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService]
})
export class UserModule {}
