import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common'
import { Purchase } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { CreatePurchaseDto } from './dto/create-purchase.dto'
import { PurchaseService } from './purchase.service'

@Controller('purchase')
export class PurchaseController {
  constructor(
    private readonly purchaseService: PurchaseService,
    private readonly prisma: PrismaService
  ) {}

  @HttpCode(200)
  @Post()
  create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.createPurchase(createPurchaseDto)
  }

  @HttpCode(200)
  @Get()
  async getAllPurchases(): Promise<Purchase[]> {
    return this.prisma.purchase.findMany()
  }

  @HttpCode(200)
  @Get()
  async getAllPurchasesForUser(userId: string): Promise<Purchase[]> {
    return this.prisma.purchase.findMany({
      where: {
        buyerId: userId
      }
    })
  }
}
