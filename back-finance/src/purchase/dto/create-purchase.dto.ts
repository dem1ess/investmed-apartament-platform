// src/purchase/dto/create-purchase.dto.ts
import { IsNumber, IsPositive, IsString } from 'class-validator'

export class CreatePurchaseDto {
  @IsString()
  propertyId: string

  @IsString()
  buyerId: string

  @IsNumber()
  @IsPositive()
  tokens: number

  @IsNumber()
  @IsPositive()
  totalCost: number
}
