import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TouristsService } from './tourists.service';
import { CreateTouristDto } from './dto/create-tourist.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateTouristDto } from './dto/update-tourist.dto';

@Controller('tourists')
@UseGuards(JwtAuthGuard)
export class TouristsController {
  constructor(private readonly touristsService: TouristsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createTouristDto: CreateTouristDto) {
    return this.touristsService.create(createTouristDto);
  }

  @Get()
  findAll() {
    return this.touristsService.findAll();
  }

  @Get('me')
  findMe(@Req() req) {
    return this.touristsService.findOne(+req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.touristsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTouristDto: UpdateTouristDto) {
    return this.touristsService.update(+id, updateTouristDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.touristsService.remove(+id);
  }
}
