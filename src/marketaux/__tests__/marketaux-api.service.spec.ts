import { TestingModule } from '@nestjs/testing';
import { MarketauxApiService } from '../api/marketaux-api.service';
import TestSetup from '@global/testing/setup.class';

describe('MarketauxApiService', () => {
  let service: MarketauxApiService;
  const testSetup = new TestSetup({ apiService: MarketauxApiService });
  beforeAll(async () => {
    const module: TestingModule = await testSetup.getTestingModule('api', {
      get: jest.fn(),
    });

    service = module.get<MarketauxApiService>(MarketauxApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
