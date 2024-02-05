import { Test, TestingModule } from '@nestjs/testing';
import { BingController } from '../bing.controller';
import { BingService } from '../bing.service';

describe('BingController', () => {
  let controller: BingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BingController],
      providers: [BingService],
    }).compile();

    controller = module.get<BingController>(BingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
