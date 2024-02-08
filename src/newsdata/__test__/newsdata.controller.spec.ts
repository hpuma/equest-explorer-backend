import { TestingModule } from '@nestjs/testing';
import { NewsDataController } from '../newsdata.controller';
import { NewsDataService } from '../newsdata.service';
import { TestSetup, TestClass } from '@global/testing/setup.class';
describe('NewsDataController', () => {
  let controller: NewsDataController;
  const testSetup = new TestSetup(TestClass.controller, {
    controller: NewsDataController,
    service: NewsDataService,
  });
  beforeAll(async () => {
    const module: TestingModule = await testSetup.getTestingModule({
      news: jest.fn(),
    });
    controller = module.get<NewsDataController>(NewsDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
