import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MaterielsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.materiel.findMany({ where: { EstActif: true } });
  }

  async findOne(id: number) {
    const materiel = await this.prisma.materiel.findUnique({ where: { Id: id } });
    if (!materiel) throw new NotFoundException('Matériel introuvable');
    return materiel;
  }

  create(nom: string, marque?: string, caution?: number) {
    return this.prisma.materiel.create({
      data: { Nom: nom, Marque: marque, Caution: caution },
    });
  }

  async update(id: number, nom?: string, marque?: string, caution?: number) {
    await this.findOne(id);
    return this.prisma.materiel.update({
      where: { Id: id },
      data: { Nom: nom, Marque: marque, Caution: caution },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.materiel.update({
      where: { Id: id },
      data: { EstActif: false },
    });
  }
}
