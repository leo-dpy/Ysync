import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from './mail.service';

@Injectable()
export class MailScheduler {
  private readonly logger = new Logger(MailScheduler.name);

  constructor(private prisma: PrismaService, private mail: MailService) {}

  // Se lance tous les jours à 8h du matin
  @Cron('0 8 * * *')
  async envoyerRappels() {
    this.logger.log('Envoi des rappels du jour...');

    const demainDebut = new Date();
    demainDebut.setDate(demainDebut.getDate() + 1);
    demainDebut.setHours(0, 0, 0, 0);

    const demainFin = new Date(demainDebut);
    demainFin.setHours(23, 59, 59, 999);

    const reservations = await this.prisma.reservation.findMany({
      where: {
        DateDebut: { gte: demainDebut, lte: demainFin },
      },
      include: {
        Utilisateur: true,
        Salle: true,
        Materiel: true,
      },
    });

    for (const resa of reservations) {
      const ressource = resa.Salle?.Nom ?? resa.Materiel?.Nom ?? 'Ressource';
      await this.mail.envoyerRappel(
        resa.Utilisateur.Email,
        resa.Utilisateur.Nom,
        ressource,
        resa.DateDebut,
      );
      this.logger.log(`Rappel envoyé à ${resa.Utilisateur.Email}`);
    }
  }
}
