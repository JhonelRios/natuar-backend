import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimalsModule } from './animals/animals.module';
import { TouristsModule } from './tourists/tourists.module';
import { SpotsModule } from './spots/spots.module';

@Module({
  imports: [AnimalsModule, TouristsModule, SpotsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
