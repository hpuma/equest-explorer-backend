import { AlphavService } from '../alphav.service';
import { getTestingModule } from './utils/test-setup';

describe('AlphavService', () => {
  let service: AlphavService;

  beforeEach(async () => {
    const module = await getTestingModule('service');

    service = module.get<AlphavService>(AlphavService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
