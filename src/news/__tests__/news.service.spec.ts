import { NewsService } from '../news.service';
import { getTestingModule } from './utils/test-setup';

describe('NewsService', () => {
  let service: NewsService;

  beforeEach(async () => {
    const module = await getTestingModule('service');

    service = module.get<NewsService>(NewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
