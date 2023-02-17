import { Test, TestingModule } from '@nestjs/testing';
import { AlphavService } from './alphav.service';

describe('AlphavService', () => {
  let service: AlphavService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlphavService],
    }).compile();

    service = module.get<AlphavService>(AlphavService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
