import { TestingModule } from '@nestjs/testing';
import { AlphavService } from '../alphav.service';
import { TestSetup, TestClass } from '@global/testing/setup.class';

describe('AlphavService', () => {
  let service: AlphavService;
  const testSetup = new TestSetup(TestClass.service, {
    service: AlphavService,
  });
  beforeAll(async () => {
    const module: TestingModule = await testSetup.getTestingModule({
      getIntraday: jest.fn(),
      getGlobalQuote: jest.fn(),
      getTickerSearch: jest.fn(),
      getNews: jest.fn(),
    });

    service = module.get<AlphavService>(AlphavService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
