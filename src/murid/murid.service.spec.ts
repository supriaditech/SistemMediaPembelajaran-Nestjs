import { Test, TestingModule } from '@nestjs/testing';
import { MuridService } from './murid.service';

describe('MuridService', () => {
  let service: MuridService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MuridService],
    }).compile();

    service = module.get<MuridService>(MuridService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
