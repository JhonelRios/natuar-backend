import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { CreateTouristDto } from 'src/tourists/dto/create-tourist.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() createTouristDto: CreateTouristDto) {
    return this.authService.register(createTouristDto);
  }

  // Google
  @Post('google')
  async loginWithGoogle(@Body() { token }: { token: string }) {
    return this.authService.loginWithGoogleToken(token);
  }
}
