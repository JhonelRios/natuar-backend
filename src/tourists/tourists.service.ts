import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTouristDto } from './dto/create-tourist.dto';
import { UpdateTouristDto } from './dto/update-tourist.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Tourist } from '@prisma/client';

@Injectable()
export class TouristsService {
  constructor(private prisma: PrismaService) {}

  async create(createTouristDto: CreateTouristDto): Promise<Tourist> {
    return this.prisma.tourist.create({
      data: createTouristDto,
    });
  }

  async findAll(): Promise<Tourist[]> {
    return this.prisma.tourist.findMany();
  }

  async findOne(id: number): Promise<Tourist> {
    const user = await this.prisma.tourist.findUnique({
      where: {
        id: id,
      },
    });

    delete user.password;

    return user;
  }

  async findOneByEmail(email: string): Promise<Tourist> {
    return this.prisma.tourist.findUnique({
      where: {
        email,
      },
    });
  }

  async update(id: number, updateTouristDto: UpdateTouristDto) {
    const user = await this.prisma.tourist.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) throw new NotFoundException('User does not exist');

    return this.prisma.tourist.update({
      where: { id },
      data: updateTouristDto,
    });
  }

  async remove(id: number): Promise<Tourist> {
    return this.prisma.tourist.delete({
      where: {
        id: id,
      },
    });
  }
}
