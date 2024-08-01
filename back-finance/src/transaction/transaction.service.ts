import { Injectable, NotFoundException } from '@nestjs/common'
import { Transaction } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionStatusDto } from './dto/update-transaction-status.dto'

@Injectable()
export class TransactionService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService
  ) {}

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    const { userId, amount } = createTransactionDto
    return await this.prisma.transaction.create({
      data: {
        user: {
          connect: {
            id: userId
          }
        },
        amount,
        transactionStatus: 'PENDING'
      }
    })
  }

  async updateTransactionStatus(
    updateTransactionStatusDto: UpdateTransactionStatusDto
  ): Promise<Transaction> {
    const { transactionId, transactionStatus } = updateTransactionStatusDto

    // Получаем текущую транзакцию
    const transaction = await this.prisma.transaction.findUnique({
      where: { id: transactionId }
    })

    if (!transaction) {
      throw new NotFoundException(
        `Transaction with id ${transactionId} not found`
      )
    }

    // Если статус изменен на COMPLETE, обновляем баланс пользователя
    if (transactionStatus === 'COMPLETE') {
      // Получаем пользователя, связанного с транзакцией
      const user = await this.prisma.user.findUnique({
        where: { id: transaction.userId }
      })

      if (!user) {
        throw new NotFoundException(
          `User with id ${transaction.userId} not found`
        )
      }

      // Обновляем баланс пользователя
      await this.userService.updateUserBalance(user.id, transaction.amount)
    }

    // Обновляем статус транзакции
    const updatedTransaction = await this.prisma.transaction.update({
      where: { id: transactionId },
      data: { transactionStatus }
    })

    return updatedTransaction
  }

  // Получение списка транзакций для конкретного пользователя
  async getUserTransactions(userId: string) {
    return await this.prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })
  }

  async findAll(): Promise<Transaction[]> {
    // Используем Prisma Client для получения всех пользователей из базы данных
    return this.prisma.transaction.findMany()
  }
}
