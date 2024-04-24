import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Spot } from '@prisma/client';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
@Injectable()
export class SpotsService {

  constructor(private prisma: PrismaService){};


  async create(createSpotDto: CreateSpotDto): Promise<Spot>{
    return this.prisma.spot.create({
      data: createSpotDto,
    });  
  }

 async findAll(): Promise<Spot[]> {
  return this.prisma.spot.findMany();
}

  async findOne(id: number) : Promise<Spot> {
    return this.prisma.spot.findUnique({
      where: {
        id: id,
      },
    });  }

  async update(id: number, updateSpotDto: UpdateSpotDto) {
    return this.prisma.spot.findUnique({
      where: {
        id: id,
      },
    });  }

  async remove(id: number): Promise<Spot> {
    return this.prisma.spot.delete({
      where: {
        id: id,
      },
    });
  }
}
