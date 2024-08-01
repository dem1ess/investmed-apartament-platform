import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common'
import { Roles } from 'src/roles/roles.decorator'

import { RolesGuard } from 'src/roles/roles.guard'
import { CreatePropertyDto } from './dto/create-property.dto'
import { UpdatePropertyDto } from './dto/update-property.dto'
import { PropertyService } from './property.service'

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @HttpCode(200)
  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertyService.create(createPropertyDto)
  }
  @HttpCode(200)
  @Get()
  findAll() {
    return this.propertyService.findAll()
  }

  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyService.findOne(id)
  }

  @HttpCode(200)
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto
  ) {
    return this.propertyService.update(id, updatePropertyDto)
  }

  @HttpCode(200)
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.propertyService.remove(id)
  }
}
