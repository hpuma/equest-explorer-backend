import { Test, TestingModule } from '@nestjs/testing';
import { AlphavApiService } from './alphav-api.service';

describe('ApiService', () => {
  let service: AlphavApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlphavApiService],
    }).compile();

    service = module.get<AlphavApiService>(AlphavApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
