import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TouristsService } from 'src/tourists/tourists.service';
import { Tourist } from '@prisma/client';
import { CreateTouristDto } from 'src/tourists/dto/create-tourist.dto';
import { OAuth2Client } from 'google-auth-library';

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

  // Google
  async loginWithGoogleToken(token: string) {
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    console.log(googleClientId);

    const client = new OAuth2Client(googleClientId);

    const response = await client.verifyIdToken({
      idToken: token,
      audience: googleClientId,
    });

    const payload = response.getPayload();

    const existingUser = await this.touristsService.findOneByEmail(
      payload.email,
    );

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(payload.email, 10);

      const newTourist = await this.touristsService.create({
        email: payload.email,
        name: payload.name,
        password: hashedPassword,
      });

      return this.login(newTourist);
    } else {
      return this.login(existingUser);
    }
  }
}
