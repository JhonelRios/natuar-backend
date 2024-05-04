import { Module } from '@nestjs/common';
import { TouristsService } from './tourists.service';
import { TouristsController } from './tourists.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TouristsController],
  providers: [TouristsService],
  imports: [PrismaModule],
  exports: [TouristsService],
})
export class TouristsModule {}
