import { TestingModule } from '@nestjs/testing';
import { NewsApiService } from '../api/news-api.service';
import { TestSetup, TestClass } from '@global/testing/setup.class';

describe('NewsApiService', () => {
  let service: NewsApiService;
  const testSetup = new TestSetup(TestClass.service, {
    service: NewsApiService,
  });
  beforeAll(async () => {
    const module: TestingModule = await testSetup.getTestingModule({
      getEverything: jest.fn(),
    });
    service = module.get<NewsApiService>(NewsApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
