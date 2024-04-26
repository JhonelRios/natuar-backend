import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TouristsService } from 'src/tourists/tourists.service';
import { Tourist } from '@prisma/client';
import { CreateTouristDto } from 'src/tourists/dto/create-tourist.dto';

@Injectable()
export class AuthService {
  constructor(
    private touristsService: TouristsService,
    private jwtService: JwtService,
  ) {}

  async validateTourist(email: string, password: string) {
    const tourist = await this.touristsService.findOneByEmail(email);

    if (!tourist) throw new BadRequestException('Not matching credentials');

    const isMatch = bcrypt.compareSync(password, tourist.password);

    if (!isMatch) throw new BadRequestException('Not matching credentials');

    return tourist;
  }

  async login(tourist: Tourist) {
    const payload = { email: tourist.email, id: tourist.id };

    return { access_token: this.jwtService.sign(payload) };
  }

  async register(createTouristDto: CreateTouristDto) {
    const existingUser = await this.touristsService.findOneByEmail(
      createTouristDto.email,
    );

    if (existingUser) throw new BadRequestException('Email already exists');

    const hashedPassword = await bcrypt.hash(createTouristDto.password, 10);

    const newTourist = await this.touristsService.create({
      ...createTouristDto,
      password: hashedPassword,
    });

    return this.login(newTourist);
  }
}
