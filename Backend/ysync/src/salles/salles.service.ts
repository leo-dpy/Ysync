import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SallesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.salle.findMany();
  }

  async findOne(id: number) {
    const salle = await this.prisma.salle.findUnique({ where: { Id: id } });
    if (!salle) throw new NotFoundException('Salle introuvable');
    return salle;
  }

  create(nom: string, categorie: string, capacite: number) {
    return this.prisma.salle.create({
      data: { Nom: nom, Categorie: categorie, Capacite: capacite },
    });
  }

  async update(id: number, nom?: string, categorie?: string, capacite?: number) {
    await this.findOne(id);
    return this.prisma.salle.update({
      where: { Id: id },
      data: { Nom: nom, Categorie: categorie, Capacite: capacite },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.salle.delete({ where: { Id: id } });
  }
}
