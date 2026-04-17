import { Test, TestingModule } from '@nestjs/testing';
import { SallesController } from './salles.controller';

describe('SallesController', () => {
  let controller: SallesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SallesController],
    }).compile();

    controller = module.get<SallesController>(SallesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
