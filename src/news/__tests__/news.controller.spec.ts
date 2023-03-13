import { GlobalValidator } from '@global/validation/global-validator.class';
import { NewsController } from '../news.controller';
import { NewsService } from '../news.service';
import { GetEverythingResponseDto } from '../api/dto/get-everything-response.dto';
import { EverythingQueryDto } from '../dto/everything-query.dto';
import { res } from '@global/testing/test-setup';
import { getTestingModule } from './test-setup';

describe('NewsController', () => {
  let controller: NewsController;
  let service: NewsService;
  let response;
  let globalValidator: GlobalValidator;

  beforeEach(async () => {
    const module = await getTestingModule('controller');
    controller = module.get<NewsController>(NewsController);
    service = module.get<NewsService>(NewsService);
    globalValidator = module.get<GlobalValidator>(GlobalValidator);
  });

  describe('when a response is returned', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
    it('should return a successful response', async () => {
      jest.spyOn(service, 'getEverything').mockResolvedValue({
        status: 'OK',
        totalResults: 1,
        articles: [],
      } as GetEverythingResponseDto);

      jest
        .spyOn(globalValidator, 'validate')
        .mockResolvedValue({ validateParams: 'WIP' });

      response = await controller.everything(
        { ticker: 'SPY' } as EverythingQueryDto,
        res,
      );

      expect(res.json).toBeCalledWith({ validateParams: 'WIP' });
      expect(response).toEqual({ validateParams: 'WIP' });
    });
    it.skip('should return an unsuccessful response', async () => {});
  });
});