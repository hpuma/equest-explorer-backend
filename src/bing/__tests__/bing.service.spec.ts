import { Test, TestingModule } from '@nestjs/testing';
import { BingService } from '../bing.service';

describe('BingService', () => {
  let service: BingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BingService],
    }).compile();

    service = module.get<BingService>(BingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
