import { TestingModule } from '@nestjs/testing';
import { GNewsService } from '../gnews.service';
import { TestSetup, TestClass } from '@global/testing/setup.class';
describe('GNewsService', () => {
  let service: GNewsService;
  const testSetup = new TestSetup(TestClass.service, {
    service: GNewsService,
  });
  beforeAll(async () => {
    const module: TestingModule = await testSetup.getTestingModule({
      getNews: jest.fn(),
    });
    service = module.get<GNewsService>(GNewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
