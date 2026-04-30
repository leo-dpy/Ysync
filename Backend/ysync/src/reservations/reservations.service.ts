import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class ReservationsService {
  constructor(
    private prisma: PrismaService,
    private mail: MailService,
  ) {}

  findAll(salleId?: number, materielId?: number) {
    return this.prisma.reservation.findMany({
      where: {
        ...(salleId && { SalleId: salleId }),
        ...(materielId && { MaterielId: materielId }),
      },
      include: {
        Utilisateur: { select: { Nom: true, Email: true } },
        Salle: true,
        Materiel: true,
      },
    });
  }

  findMes(utilisateurId: number) {
    return this.prisma.reservation.findMany({
      where: { UtilisateurId: utilisateurId },
      include: { Salle: true, Materiel: true },
    });
  }

  async create(
    utilisateurId: number,
    dateDebut: Date,
    dateFin: Date,
    salleId?: number,
    materielId?: number,
  ) {
    // ── Règle 1 : dateFin doit être après dateDebut ──
    if (dateFin <= dateDebut) {
      throw new BadRequestException('La date de fin doit être après la date de début');
    }

    // ── Règle 2 : max 4h d'affilée ──
    const dureeMs = dateFin.getTime() - dateDebut.getTime();
    const dureeHeures = dureeMs / (1000 * 60 * 60);
    if (dureeHeures > 4) {
      throw new BadRequestException('Une réservation ne peut pas dépasser 4 heures');
    }

    // ── Règle 3 : pas de réservation la nuit (22h → 7h) ──
    const heureDebut = dateDebut.getHours();
    const heureFin = dateFin.getHours();
    const minutesFin = dateFin.getMinutes();

    const debutNuit = heureDebut >= 22 || heureDebut < 7;
    const finNuit = heureFin < 7 || (heureFin === 22 && minutesFin > 0) || heureFin > 22;

    if (debutNuit || finNuit) {
      throw new BadRequestException('Les réservations sont interdites entre 22h et 7h');
    }

    // ── Vérification de conflit ──
    const conflit = await this.prisma.reservation.findFirst({
      where: {
        ...(salleId && { SalleId: salleId }),
        ...(materielId && { MaterielId: materielId }),
        AND: [
          { DateDebut: { lt: dateFin } },
          { DateFin: { gt: dateDebut } },
        ],
      },
    });
    if (conflit) throw new ConflictException('Ce créneau est déjà réservé');

    // ── Création de la réservation ──
    const reservation = await this.prisma.reservation.create({
      data: {
        UtilisateurId: utilisateurId,
        SalleId: salleId ?? null,
        MaterielId: materielId ?? null,
        DateDebut: dateDebut,
        DateFin: dateFin,
        Statut: 'confirmée',
      },
      include: {
        Utilisateur: true,
        Salle: true,
        Materiel: true,
      },
    });

    // ── Envoi de l'email de confirmation ──
    const ressource = reservation.Salle?.Nom ?? reservation.Materiel?.Nom ?? 'Ressource';
    await this.mail.envoyerConfirmation(
      reservation.Utilisateur.Email,
      reservation.Utilisateur.Nom,
      ressource,
      dateDebut,
      dateFin,
    );

    return reservation;
  }

  async remove(id: number, utilisateurId: number, role: string) {
    const resa = await this.prisma.reservation.findUnique({ where: { Id: id } });
    if (!resa) throw new NotFoundException('Réservation introuvable');

    if (role !== 'Admin' && resa.UtilisateurId !== utilisateurId) {
      throw new NotFoundException('Réservation introuvable');
    }

    return this.prisma.reservation.delete({ where: { Id: id } });
  }
}
