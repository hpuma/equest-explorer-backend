import { Test, TestingModule } from '@nestjs/testing';
import { MarketauxApiService } from './marketaux-api.service';

describe('MarketauxApiService', () => {
  let service: MarketauxApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarketauxApiService],
    }).compile();

    service = module.get<MarketauxApiService>(MarketauxApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
