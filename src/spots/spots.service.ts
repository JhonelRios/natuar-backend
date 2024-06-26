import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Animal, Spot } from '@prisma/client';
import { CreateSpotDto } from './dto/create-spot.dto';
// import { UpdateSpotDto } from './dto/update-spot.dto';
@Injectable()
export class SpotsService {
  constructor(private prisma: PrismaService) {}

  async create(createSpotDto: CreateSpotDto): Promise<Spot> {
    return this.prisma.spot.create({
      data: createSpotDto,
    });
  }

  async findAll(): Promise<Spot[]> {
    return this.prisma.spot.findMany();
  }

  async findOne(id: number): Promise<Spot> {
    return this.prisma.spot.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findNearestLocation(lat: number, lon: number): Promise<Spot> {
    const [location] = await this.prisma.$queryRaw<Spot[]>`
      SELECT *, 
            ST_Distance(
              geography(ST_MakePoint(longitude, latitude)),
              geography(ST_MakePoint(${lon}, ${lat}))
            ) as distance
      FROM "Spot"
      ORDER BY distance ASC
      LIMIT 1;
    `;

    return location;
  }

  // async update(id: number, updateSpotDto: UpdateSpotDto) {
  //   return this.prisma.spot.findUnique({
  //     where: {
  //       id: id,
  //     },
  //   });
  // }

  async remove(id: number): Promise<Spot> {
    return this.prisma.spot.delete({
      where: {
        id: id,
      },
    });
  }

  async findAllAnimalsBySpotId(spotId: number): Promise<Animal[]> {
    const spot = await this.prisma.spot.findUnique({
      where: { id: spotId },
      include: { animals: true },
    });
    return spot.animals;
  }
}
