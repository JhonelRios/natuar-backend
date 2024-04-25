import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { Animal } from '@prisma/client';
import { CreateAnimalDto } from './dto/create-animal.dto';
// import { UpdateAnimalDto } from './dto/update-animal.dto';

@Injectable()
export class AnimalsService {
  constructor(private prisma: PrismaService) {}

  async create(createAnimalDto: CreateAnimalDto): Promise<Animal> {
    return this.prisma.animal.create({
      data: createAnimalDto,
    });
  }

  async findAll(): Promise<Animal[]> {
    return this.prisma.animal.findMany();
  }

  async findOne(id: number): Promise<Animal> {
    return this.prisma.animal.findUnique({
      where: {
        id: id,
      },
    });
  }

  // async update(id: number, updateAnimalDto: UpdateAnimalDto) {
  //   return this.prisma.animal.findUnique({
  //     where: {
  //       id: id,
  //     },
  //   });
  // }

  async remove(id: number): Promise<Animal> {
    return this.prisma.animal.delete({
      where: {
        id: id,
      },
    });
  }
}
