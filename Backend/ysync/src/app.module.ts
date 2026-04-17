import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { SallesModule } from './salles/salles.module';
import { MaterielsModule } from './materiels/materiels.module';
import { ReservationsModule } from './reservations/reservations.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MailModule,
    AuthModule,
    SallesModule,
    MaterielsModule,
    ReservationsModule,
  ],
})
export class AppModule {}