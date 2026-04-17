import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

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

    return this.prisma.reservation.create({
      data: {
        UtilisateurId: utilisateurId,
        SalleId: salleId ?? null,
        MaterielId: materielId ?? null,
        DateDebut: dateDebut,
        DateFin: dateFin,
        Statut: 'confirmée',
      },
    });
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