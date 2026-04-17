import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards, Request } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @Get()
  findAll(
    @Query('salleId') salleId?: string,
    @Query('materielId') materielId?: string,
  ) {
    return this.reservationsService.findAll(
      salleId ? +salleId : undefined,
      materielId ? +materielId : undefined,
    );
  }

  @Get('mes-reservations')
  findMes(@Request() req) {
    return this.reservationsService.findMes(req.user.sub);
  }

  @Post()
  create(
    @Request() req,
    @Body() body: {
      dateDebut: string;
      dateFin: string;
      salleId?: number;
      materielId?: number;
    },
  ) {
    return this.reservationsService.create(
      req.user.sub,
      new Date(body.dateDebut),
      new Date(body.dateFin),
      body.salleId,
      body.materielId,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.reservationsService.remove(+id, req.user.sub, req.user.role);
  }
}
