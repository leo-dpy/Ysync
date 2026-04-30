import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.utilisateur.findMany({
      select: { Id: true, Nom: true, Email: true, Role: true },
      orderBy: { Nom: 'asc' },
    });
  }

  async updateRole(id: number, role: string) {
    const user = await this.prisma.utilisateur.findUnique({ where: { Id: id } });
    if (!user) throw new NotFoundException('Utilisateur introuvable');
    return this.prisma.utilisateur.update({
      where: { Id: id },
      data: { Role: role },
      select: { Id: true, Nom: true, Email: true, Role: true },
    });
  }

  async remove(id: number) {
    const user = await this.prisma.utilisateur.findUnique({ where: { Id: id } });
    if (!user) throw new NotFoundException('Utilisateur introuvable');
    await this.prisma.utilisateur.delete({ where: { Id: id } });
    return { message: 'Utilisateur supprimé' };
  }
}
