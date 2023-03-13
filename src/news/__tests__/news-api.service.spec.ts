import { NewsApiService } from '../api/news-api.service';
import { getTestingModule } from './utils/test-setup';

describe('NewsApiService', () => {
  let service: NewsApiService;

  beforeEach(async () => {
    const module = await getTestingModule('api');

    service = module.get<NewsApiService>(NewsApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
