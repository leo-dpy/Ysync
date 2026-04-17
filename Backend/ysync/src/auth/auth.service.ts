import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(nom: string, email: string, motDePasse: string, role: string) {
    const existe = await this.prisma.utilisateur.findUnique({ where: { Email: email } });
    if (existe) throw new ConflictException('Email déjà utilisé');

    const hash = await bcrypt.hash(motDePasse, 10);
    const user = await this.prisma.utilisateur.create({
      data: { Nom: nom, Email: email, MotDePasse: hash, Role: role },
    });
    return { id: user.Id, email: user.Email, role: user.Role };
  }

  async login(email: string, motDePasse: string) {
    const user = await this.prisma.utilisateur.findUnique({ where: { Email: email } });
    if (!user) throw new UnauthorizedException('Identifiants invalides');

    const ok = await bcrypt.compare(motDePasse, user.MotDePasse);
    if (!ok) throw new UnauthorizedException('Identifiants invalides');

    const token = await this.jwt.signAsync({ sub: user.Id, role: user.Role });
    return { access_token: token };
  }

  async me(userId: number) {
    return this.prisma.utilisateur.findUnique({
      where: { Id: userId },
      select: { Id: true, Nom: true, Email: true, Role: true },
    });
  }
}
