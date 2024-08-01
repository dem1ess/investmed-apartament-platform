import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { BankDetailsController } from './bank-details.controller'
import { BankDetailsService } from './bank-details.service'

@Module({
  controllers: [BankDetailsController],
  providers: [BankDetailsService, PrismaService]
})
export class BankDetailsModule {}
