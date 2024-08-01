import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { BankDetailsService } from './bank-details.service'

@Controller('bank-details')
export class BankDetailsController {
  constructor(private readonly bankDetailsService: BankDetailsService) {}

  @Post()
  async createBankDetails(@Body() data: Prisma.BankDetailsCreateInput) {
    return this.bankDetailsService.createBankDetails(data)
  }

  @Put(':id')
  async updateBankDetails(
    @Param('id') id: string,
    @Body() data: Prisma.BankDetailsUpdateInput
  ) {
    return this.bankDetailsService.updateBankDetails(id, data)
  }

  @Get(':id')
  async getBankDetails(@Param('id') id: string) {
    return this.bankDetailsService.getBankDetails(id)
  }

  @Get()
  async getAllBankDetails() {
    return this.bankDetailsService.getAllBankDetails()
  }
}
