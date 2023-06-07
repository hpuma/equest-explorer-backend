import { TestingModule } from '@nestjs/testing';
import { MarketauxController } from '../marketaux.controller';
import { MarketauxService } from '../marketaux.service';
import { TestSetup, TestClass } from '@global/testing/setup.class';
describe('MarketauxController', () => {
  let controller: MarketauxController;
  const testSetup = new TestSetup(TestClass.controller, {
    controller: MarketauxController,
    service: MarketauxService,
  });
  beforeAll(async () => {
    const module: TestingModule = await testSetup.getTestingModule({
      news: jest.fn(),
    });
    controller = module.get<MarketauxController>(MarketauxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
