import { TestingModule } from '@nestjs/testing';
import { TheNewsService } from '../thenews.service';
import { TestSetup, TestClass } from '@global/testing/setup.class';
describe('BingService', () => {
  let service: TheNewsService;
  const testSetup = new TestSetup(TestClass.service, {
    service: TheNewsService,
  });
  beforeAll(async () => {
    const module: TestingModule = await testSetup.getTestingModule({
      getNews: jest.fn(),
    });
    service = module.get<TheNewsService>(TheNewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
