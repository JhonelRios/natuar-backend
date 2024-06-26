import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SpotsService } from './spots.service';
import { CreateSpotDto } from './dto/create-spot.dto';
import { Animal } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
// import { UpdateSpotDto } from './dto/update-spot.dto';

@Controller('spots')
@UseGuards(JwtAuthGuard)
export class SpotsController {
  constructor(private readonly spotsService: SpotsService) {}

  @Post()
  create(@Body() createSpotDto: CreateSpotDto) {
    return this.spotsService.create(createSpotDto);
  }

  @Get()
  findAll() {
    return this.spotsService.findAll();
  }

  @Get('nearest')
  findNearestLocation(@Query('lat') lat: string, @Query('lon') lon: string) {
    return this.spotsService.findNearestLocation(
      parseFloat(lat),
      parseFloat(lon),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spotsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spotsService.remove(+id);
  }

  @Get(':id/animals')
  findAllAnimalsBySportId(@Param('id') spotId: string): Promise<Animal[]> {
    return this.spotsService.findAllAnimalsBySpotId(+spotId);
  }
}
