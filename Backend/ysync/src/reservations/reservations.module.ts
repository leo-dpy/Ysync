import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';

@Module({
  controllers: [ReservationsController],
  providers: [ReservationsService]
})
export class ReservationsModule {}
