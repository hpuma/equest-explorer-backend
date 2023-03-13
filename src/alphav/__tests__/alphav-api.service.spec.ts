import { AlphavApiService } from '../api/alphav-api.service';
import { getTestingModule } from './utils/test-setup';

describe('ApiService', () => {
  let service: AlphavApiService;

  beforeEach(async () => {
    const module = await getTestingModule('api');

    service = module.get<AlphavApiService>(AlphavApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
