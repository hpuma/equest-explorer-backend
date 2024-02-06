import { TestingModule } from '@nestjs/testing';
import { BingService } from '../bing.service';
import { TestSetup, TestClass } from '@global/testing/setup.class';
describe('BingService', () => {
  let service: BingService;
  const testSetup = new TestSetup(TestClass.service, {
    service: BingService,
  });
  beforeAll(async () => {
    const module: TestingModule = await testSetup.getTestingModule({
      getNews: jest.fn(),
    });
    service = module.get<BingService>(BingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
