import { Module } from '@nestjs/common';
import { SallesController } from './salles.controller';
import { SallesService } from './salles.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [SallesController],
  providers: [SallesService, PrismaService],
})
export class SallesModule {}
