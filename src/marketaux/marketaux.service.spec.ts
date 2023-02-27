import { Test, TestingModule } from '@nestjs/testing';
import { MarketauxService } from './marketaux.service';

describe('MarketauxService', () => {
  let service: MarketauxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarketauxService],
    }).compile();

    service = module.get<MarketauxService>(MarketauxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
