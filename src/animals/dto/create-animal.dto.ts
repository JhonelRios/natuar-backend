export class CreateAnimalDto {
  name: string;
  scientific_name: string;
  description: string;
  //TODO: Fix typo here and in the schema
  weigth: number;
  height: number;
  average_age: number;
  habitat: string;
  diet: string;
  gestation: string;
  in_danger: boolean;
  images: string[];
  model_name: string;
  latitude: number;
  longitude: number;
  spotId?: number;
}
