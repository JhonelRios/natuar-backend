import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { AnimalsModule } from './animals/animals.module';
import { TouristsModule } from './tourists/tourists.module';
import { SpotsModule } from './spots/spots.module';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AnimalsModule, TouristsModule, SpotsModule, PrismaModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
