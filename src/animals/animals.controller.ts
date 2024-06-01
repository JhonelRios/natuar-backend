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

  @Get('favorites')
  findFavorites(@Request() req) {
    return this.animalsService.getFavoriteAnimals(Number(req.user.id));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalsService.findOne(+id);
  }

  @Post(':id/favorite')
  markAsFavorite(@Request() req, @Param('id') id: string) {
    return this.animalsService.markAsFavorite(Number(req.user.id), +id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
  //   return this.animalsService.update(+id, updateAnimalDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalsService.remove(+id);
  }
}
