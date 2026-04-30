import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { SallesService } from './salles.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(AuthGuard)
@Controller('salles')
export class SallesController {
  constructor(private sallesService: SallesService) {}

  @Get()
  findAll() {
    return this.sallesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sallesService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Post()
  create(@Body() body: { nom: string; categorie: string; capacite: number }) {
    return this.sallesService.create(body.nom, body.categorie, body.capacite);
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: { nom?: string; categorie?: string; capacite?: number }) {
    return this.sallesService.update(+id, body.nom, body.categorie, body.capacite);
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sallesService.remove(+id);
  }
}
