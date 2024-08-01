import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { Transaction } from '@prisma/client'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionStatusDto } from './dto/update-transaction-status.dto'
import { TransactionService } from './transaction.service'

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @HttpCode(200)
  @Post()
  @UsePipes(ValidationPipe)
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.createTransaction(createTransactionDto)
  }

  @HttpCode(200)
  @Patch('/update')
  @UsePipes(ValidationPipe)
  async updateTransactionStatus(
    @Body() updateTransactionStatusDto: UpdateTransactionStatusDto
  ) {
    console.log(updateTransactionStatusDto)
    return this.transactionService.updateTransactionStatus(
      updateTransactionStatusDto
    )
  }

  @Get()
  async getAllTransactions(): Promise<Transaction[]> {
    return this.transactionService.findAll()
  }
}
