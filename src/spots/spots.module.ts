import { Module } from '@nestjs/common';
import { SpotsService } from './spots.service';
import { SpotsController } from './spots.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SpotsController],
  providers: [SpotsService],
  imports: [PrismaModule],
})
export class SpotsModule {}
