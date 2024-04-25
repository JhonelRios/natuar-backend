export class CreateAnimalDto {
  name: string;
  description: string;
  in_danger: boolean;
  images: string[];
  spotId?: number;
}
