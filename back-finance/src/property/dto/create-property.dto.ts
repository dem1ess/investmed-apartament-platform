// create-property.dto.ts
import { IsArray, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator'

export class CreatePropertyDto {
  @IsString()
  name: string

  @IsString()
  description: string

  @IsNumber()
  price: number

  @IsNumber()
  tokens: number

  @IsNumber()
  priceToken: number

  @IsNumber()
  availableTokens: number

  @IsNumber()
  landArea: number

  @IsNumber()
  houseArea: number

  @IsString()
  distanceToSea: string

  @IsUrl()
  @IsOptional()
  videoUrl?: string

  @IsArray()
  @IsString({ each: true })
  documentUrls: string[]

  @IsString()
  mainLocation: string

  @IsString()
  location1: string

  @IsString()
  location2: string

  @IsArray()
  @IsString({ each: true })
  photoUrls: string[]

  @IsNumber()
  roi: number

  @IsNumber()
  legalFees: number

  @IsNumber()
  rentPerYear: number

  @IsNumber()
  facilityManagement: number

  @IsNumber()
  annualGrowthRate: number

  @IsNumber()
  yearOfCompletion: number

  @IsString()
  bookingLink: string
}
