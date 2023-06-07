import { TestingModule } from '@nestjs/testing';
import { MarketauxService } from '../marketaux.service';
import { TestSetup, TestClass } from '@global/testing/setup.class';
describe('MarketauxService', () => {
  let service: MarketauxService;
  const testSetup = new TestSetup(TestClass.service, {
    service: MarketauxService,
  });
  beforeAll(async () => {
    const module: TestingModule = await testSetup.getTestingModule({
      getNews: jest.fn(),
    });
    service = module.get<MarketauxService>(MarketauxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
