import { Test, TestingModule } from '@nestjs/testing';
import { MarketauxController } from './marketaux.controller';

describe('MarketauxController', () => {
  let controller: MarketauxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketauxController],
    }).compile();

    controller = module.get<MarketauxController>(MarketauxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
