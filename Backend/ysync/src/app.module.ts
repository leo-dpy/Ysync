import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { SallesModule } from './salles/salles.module';
import { MaterielsModule } from './materiels/materiels.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [AuthModule, SallesModule, MaterielsModule, ReservationsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
