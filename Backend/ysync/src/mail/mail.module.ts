import { Module, Global } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailScheduler } from './mail.scheduler';
import { PrismaService } from '../prisma/prisma.service';

@Global()
@Module({
  providers: [MailService, MailScheduler, PrismaService],
  exports: [MailService],
})
export class MailModule {}