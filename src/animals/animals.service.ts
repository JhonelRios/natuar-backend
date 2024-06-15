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
    return this.prisma.animal.findMany({ where: { status: 1 } });
  }

  async findOne(id: number): Promise<Animal> {
    return this.prisma.animal.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getFavoriteAnimals(userId: number) {
    const favorites = await this.prisma.favoriteAnimal.findMany({
      where: { touristId: userId },
      include: { animal: true },
    });

    return favorites.map((fav) => fav.animal);
  }

  async getSeenAnimals(userId: number) {
    const animals = await this.prisma.seenAnimal.findMany({
      where: { touristId: userId },
      include: { animal: true },
    });

    return animals.map((fav) => fav.animal);
  }

  async markAsSeen(userId: number, animalId: number) {
    const seenAnimal = await this.prisma.seenAnimal.findFirst({
      where: { animalId },
    });

    if (seenAnimal) return;

    return this.prisma.seenAnimal.create({
      data: { touristId: userId, animalId },
    });
  }

  async markAsFavorite(userId: number, animalId: number) {
    return this.prisma.favoriteAnimal.create({
      data: { touristId: userId, animalId },
    });
  }

  async getIsFavoriteAnimal(userId: number, animalId: number) {
    const animal = await this.prisma.favoriteAnimal.findFirst({
      where: { touristId: userId, animalId },
    });

    return Boolean(animal);
  }

  // async update(id: number, updateAnimalDto: UpdateAnimalDto) {
  //   return this.prisma.animal.findUnique({
  //     where: {
  //       id: id,
  //     },
  //   });
  // }
  async removeFavorite(animalId: number) {
    const favoriteAnimalMatch = await this.prisma.favoriteAnimal.findFirst({
      where: { animalId },
    });

    return this.prisma.favoriteAnimal.delete({
      where: { id: favoriteAnimalMatch.id },
    });
  }

  async remove(id: number): Promise<Animal> {
    return this.prisma.animal.delete({
      where: {
        id: id,
      },
    });
  }
}
