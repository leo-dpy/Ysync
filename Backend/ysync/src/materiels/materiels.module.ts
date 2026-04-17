import { Module } from '@nestjs/common';
import { MaterielsController } from './materiels.controller';
import { MaterielsService } from './materiels.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [MaterielsController],
  providers: [MaterielsService, PrismaService],
})
export class MaterielsModule {}
