import { Test, TestingModule } from '@nestjs/testing';
import { AlpahvApiService } from './alphav-api.service';

describe('ApiService', () => {
  let service: AlpahvApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlpahvApiService],
    }).compile();

    service = module.get<AlpahvApiService>(AlpahvApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
