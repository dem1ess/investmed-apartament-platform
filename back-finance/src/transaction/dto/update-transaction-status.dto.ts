import { TransactionStatus } from '@prisma/client'
import { IsEnum, IsString } from 'class-validator'

export class UpdateTransactionStatusDto {
  @IsString()
  transactionId: string

  @IsEnum(TransactionStatus)
  transactionStatus: TransactionStatus
}
