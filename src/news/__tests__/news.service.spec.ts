import { TestingModule } from '@nestjs/testing';
import { NewsService } from '../news.service';
import { TestSetup, TestClass } from '@global/testing/setup.class';
describe('NewsService', () => {
  let service: NewsService;
  const testSetup = new TestSetup(TestClass.service, {
    service: NewsService,
  });
  beforeAll(async () => {
    const module: TestingModule = await testSetup.getTestingModule({
      getEverything: jest.fn(),
    });
    service = module.get<NewsService>(NewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
