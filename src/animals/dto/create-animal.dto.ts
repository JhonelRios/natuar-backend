export class CreateAnimalDto {
  name: string;
  description: string;
  inDanger: boolean;
  images: string[];
  spotId?: number;
}