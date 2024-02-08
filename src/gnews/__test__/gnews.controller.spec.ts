import { TestingModule } from '@nestjs/testing';
import { GNewsController } from '../gnews.controller';
import { GNewsService } from '../gnews.service';
import { TestSetup, TestClass } from '@global/testing/setup.class';
describe('GNewsController', () => {
  let controller: GNewsController;
  const testSetup = new TestSetup(TestClass.controller, {
    controller: GNewsController,
    service: GNewsService,
  });
  beforeAll(async () => {
    const module: TestingModule = await testSetup.getTestingModule({
      news: jest.fn(),
    });
    controller = module.get<GNewsController>(GNewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
