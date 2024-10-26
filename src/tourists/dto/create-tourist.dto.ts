import { IsEmail } from 'class-validator';

export class CreateTouristDto {
  name: string;
  password: string;

  @IsEmail()
  email: string;
}
