// src/purchase/purchase.service.ts
import { BadRequestException, Injectable } from '@nestjs/common'
import { Purchase } from '@prisma/client'
import { UserService } from 'src/user/user.service'
import { PrismaService } from '../prisma.service' // Путь к вашему PrismaService
import { PropertyService } from '../property/property.service' // Путь к вашему PropertyService
import { CreatePurchaseDto } from './dto/create-purchase.dto'

@Injectable()
export class PurchaseService {
  constructor(
    private prisma: PrismaService,
    private propertyService: PropertyService,
    private userService: UserService
  ) {}

  async createPurchase(
    createPurchaseDto: CreatePurchaseDto
  ): Promise<Purchase> {
    // Получаем цену токена из свойства
    const property = await this.prisma.property.findUnique({
      where: { id: createPurchaseDto.propertyId }
    })

    if (!property) {
      throw new BadRequestException(
        `Property with id ${createPurchaseDto.propertyId} not found`
      )
    }

    const priceToken = property.priceToken
    const totalCost = createPurchaseDto.tokens * priceToken

    // Снимаем деньги со счета пользователя
    await this.userService.updateUserBalance(
      createPurchaseDto.buyerId,
      -totalCost
    )

    // Создаем покупку
    const purchase = await this.prisma.purchase.create({
      data: {
        property: { connect: { id: createPurchaseDto.propertyId } },
        buyer: { connect: { id: createPurchaseDto.buyerId } },
        tokens: createPurchaseDto.tokens,
        totalCost: totalCost
      }
    })

    // Обновляем availableTokens в Property
    await this.propertyService.updateAvailableTokens(
      createPurchaseDto.propertyId,
      createPurchaseDto.tokens
    )

    return purchase
  }

  async getAllPurchasesForUser(userId: string): Promise<Purchase[]> {
    return this.prisma.purchase.findMany({
      where: {
        buyerId: userId
      }
    })
  }
}
