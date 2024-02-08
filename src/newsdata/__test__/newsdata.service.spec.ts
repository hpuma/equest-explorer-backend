import { TestingModule } from '@nestjs/testing';
import { NewsDataService } from '../newsdata.service';
import { TestSetup, TestClass } from '@global/testing/setup.class';
describe('NewsDataService', () => {
  let service: NewsDataService;
  const testSetup = new TestSetup(TestClass.service, {
    service: NewsDataService,
  });
  beforeAll(async () => {
    const module: TestingModule = await testSetup.getTestingModule({
      getNews: jest.fn(),
    });
    service = module.get<NewsDataService>(NewsDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
