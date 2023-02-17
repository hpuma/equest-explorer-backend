import { Test, TestingModule } from '@nestjs/testing';
import { AlphavController } from './alphav.controller';
import { AlphavService } from './alphav.service';

describe('AlphavController', () => {
  let controller: AlphavController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlphavController],
      providers: [AlphavService],
    }).compile();

    controller = module.get<AlphavController>(AlphavController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
