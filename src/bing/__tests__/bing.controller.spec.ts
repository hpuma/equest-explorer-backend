import { TestingModule } from '@nestjs/testing';
import { BingController } from '../bing.controller';
import { BingService } from '../bing.service';
import { TestSetup, TestClass } from '@global/testing/setup.class';
describe('BingController', () => {
  let controller: BingController;
  const testSetup = new TestSetup(TestClass.controller, {
    controller: BingController,
    service: BingService,
  });
  beforeAll(async () => {
    const module: TestingModule = await testSetup.getTestingModule({
      news: jest.fn(),
    });
    controller = module.get<BingController>(BingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
