// src/property/property.service.ts
import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { Property } from '@prisma/client'
import { FilesService } from 'src/file.service'
import { PrismaService } from '../prisma.service'
import { CreatePropertyDto } from './dto/create-property.dto'
import { UpdatePropertyDto } from './dto/update-property.dto'

@Injectable()
export class PropertyService {
	constructor(
		private prisma: PrismaService,
	) {
	}

	async create(dto: CreatePropertyDto): Promise<Property> {

		return this.prisma.property.create({
			data: {
				name: dto.name,
				description: dto.description,
				price: +dto.price,
				tokens: +dto.tokens,
				priceToken: +dto.priceToken,
				availableTokens: +dto.availableTokens,
				landArea: +dto.landArea,
				houseArea: +dto.houseArea,
				distanceToSea: dto.distanceToSea,
				documentUrls: dto.documentUrls, // Используйте сохраненные URL документов
				location1: dto.location1,
				location2: dto.location2,
				mainLocation: dto.mainLocation,
				videoUrl: dto.videoUrl,
				photoUrls: dto.photoUrls, // Используйте сохраненные URL фотографий
				facilityManagement: +dto.facilityManagement,
				rentPerYear: +dto.rentPerYear,
				legalFees: +dto.legalFees,
				roi: +dto.roi,
				annualGrowthRate: +dto.annualGrowthRate,
				yearOfCompletion: +dto.yearOfCompletion,
				bookingLink: dto.bookingLink
			}
		})
	}

	async updateAvailableTokens(
		propertyId: string,
		tokens: number
	): Promise<Property> {
		try {
			// Получаем текущее свойство
			const property = await this.prisma.property.findUnique({
				where: { id: propertyId }
			})

			if (!property) {
				throw new NotFoundException(`Property with id ${propertyId} not found`)
			}

			// Проверяем, что доступно достаточное количество токенов
			if (property.availableTokens < tokens) {
				throw new BadRequestException(
					`Not enough available tokens for property ${propertyId}`
				)
			}

			// Обновляем количество доступных токенов
			const updatedProperty = await this.prisma.property.update({
				where: { id: propertyId },
				data: { availableTokens: property.availableTokens - tokens }
			})

			return updatedProperty
		} catch (error) {
			// Перебрасываем исключение, если оно не является Nest.js исключением
			if (
				!(error instanceof NotFoundException) &&
				!(error instanceof BadRequestException)
			) {
				throw new Error(
					`Failed to update available tokens for property ${propertyId}: ${error.message}`
				)
			}
			throw error
		}
	}

	async findAll(): Promise<Property[]> {
		return this.prisma.property.findMany()
	}

	async findOne(id: string): Promise<Property | null> {
		return this.prisma.property.findUnique({
			where: { id }
		})
	}

	async update(
		id: string,
		updatePropertyDto: UpdatePropertyDto
	): Promise<Property> {
		// Проверяем, существует ли объект Property с указанным id
		const existingProperty = await this.prisma.property.findUnique({
			where: { id }
		})

		if (!existingProperty) {
			throw new NotFoundException(`Property with id ${id} not found`)
		}

		// Обновляем объект Property с использованием данных из DTO
		return this.prisma.property.update({
			where: { id },
			data: updatePropertyDto
		})
	}

	async remove(id: string): Promise<Property> {
		return this.prisma.property.delete({
			where: { id }
		})
	}
}
