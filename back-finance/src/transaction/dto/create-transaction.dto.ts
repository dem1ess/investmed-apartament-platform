// create-transaction.dto.ts
import { IsNumber, IsString } from 'class-validator'

export class CreateTransactionDto {
  @IsString()
  userId: string

  @IsNumber()
  amount: number
}
