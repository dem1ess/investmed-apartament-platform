import { Role } from '@prisma/client'
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MinLength
} from 'class-validator'

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  id?: string

  @IsOptional()
  @IsString()
  googleId?: string

  @IsOptional()
  @IsEnum(Role, { message: 'Роль должна быть либо "USER" или "ADMIN"' })
  role?: Role

  @IsOptional()
  @IsNumber({}, { message: 'Баланс должен быть числом' })
  balance?: number

  @IsOptional()
  @IsEmail({}, { message: 'Некорректный email' })
  email?: string

  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'Пароль должен содержать минимум 8 символов' })
  password?: string

  @IsOptional()
  @IsString()
  firstName?: string

  @IsOptional()
  @IsString()
  lastName?: string

  @IsOptional()
  @IsString()
  documentType?: string

  @IsOptional()
  @IsString()
  country?: string

  @IsOptional()
  @IsString()
  documentPhoto1Url?: string

  @IsOptional()
  @IsString()
  documentPhoto2Url?: string

  @IsOptional()
  @IsString()
  selfieUrl?: string

  @IsOptional()
  @IsBoolean({ message: 'Поле isVerif должно быть булевым значением' })
  isVerif?: boolean

  @IsOptional()
  @IsString()
  wallet?: string

  @IsOptional()
  @IsBoolean()
  isEmailVerif?: boolean
}
