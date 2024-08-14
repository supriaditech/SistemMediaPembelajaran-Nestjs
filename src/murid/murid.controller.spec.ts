import { Test, TestingModule } from '@nestjs/testing';
import { MuridController } from './murid.controller';

describe('MuridController', () => {
  let controller: MuridController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MuridController],
    }).compile();

    controller = module.get<MuridController>(MuridController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
