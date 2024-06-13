import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
// import { UpdateAnimalDto } from './dto/update-animal.dto';

@Controller('animals')
@UseGuards(JwtAuthGuard)
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalsService.create(createAnimalDto);
  }

  @Get()
  findAll() {
    return this.animalsService.findAll();
  }

  @Get('seen')
  findSeen(@Request() req) {
    return this.animalsService.getSeenAnimals(+req.user.id);
  }

  @Get('favorites')
  findFavorites(@Request() req) {
    return this.animalsService.getFavoriteAnimals(Number(req.user.id));
  }

  @Get(':id/favorite')
  async getIsInFavorite(@Request() req, @Param('id') id: string) {
    const isFavorite = await this.animalsService.getIsFavoriteAnimal(
      +req.user.id,
      +id,
    );

    return { isFavorite };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalsService.findOne(+id);
  }

  @Post(':id/seen')
  markAsSeen(@Request() req, @Param('id') id: string) {
    return this.animalsService.markAsSeen(Number(req.user.id), +id);
  }

  @Post(':id/favorite')
  markAsFavorite(@Request() req, @Param('id') id: string) {
    return this.animalsService.markAsFavorite(Number(req.user.id), +id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
  //   return this.animalsService.update(+id, updateAnimalDto);
  // }

  @Delete('favorite/:id')
  remove(@Param('id') id: string) {
    return this.animalsService.removeFavorite(+id);
  }
}
