import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma.service'

@Injectable()
export class BankDetailsService {
  constructor(private prisma: PrismaService) {}

  async createBankDetails(data: Prisma.BankDetailsCreateInput) {
    return this.prisma.bankDetails.create({ data })
  }

  async updateBankDetails(id: string, data: Prisma.BankDetailsUpdateInput) {
    return this.prisma.bankDetails.update({
      where: { id },
      data
    })
  }

  async getBankDetails(id: string) {
    return this.prisma.bankDetails.findUnique({
      where: { id }
    })
  }

  async getAllBankDetails() {
    return this.prisma.bankDetails.findMany()
  }
}
