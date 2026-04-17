import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { MaterielsService } from './materiels.service';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('materiels')
export class MaterielsController {
  constructor(private materielsService: MaterielsService) {}

  @Get()
  findAll() {
    return this.materielsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materielsService.findOne(+id);
  }

  @Post()
  create(@Body() body: { nom: string; marque?: string; caution?: number }) {
    return this.materielsService.create(body.nom, body.marque, body.caution);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: { nom?: string; marque?: string; caution?: number }) {
    return this.materielsService.update(+id, body.nom, body.marque, body.caution);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materielsService.remove(+id);
  }
}
