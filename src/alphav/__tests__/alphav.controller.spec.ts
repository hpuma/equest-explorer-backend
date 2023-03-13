import { GlobalValidator } from '@global/validation/global-validator.class';
import { AlphavController } from '../alphav.controller';
import { AlphavService } from '../alphav.service';
import { GetResponseDto } from '../api/dto/get-response.dto';
import { IntradayQueryDto } from '../dto/intraday-query.dto';
import { res } from '@global/testing/test-setup';
import { getTestingModule } from './test-setup';

describe('AlphavController', () => {
  let controller: AlphavController;
  let service: AlphavService;
  let response;
  let globalValidator: GlobalValidator;

  beforeEach(async () => {
    const module = await getTestingModule('controller');

    controller = module.get<AlphavController>(AlphavController);
    service = module.get<AlphavService>(AlphavService);
    globalValidator = module.get<GlobalValidator>(GlobalValidator);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('when a response is returned', () => {
    it('should return a successful response', async () => {
      jest
        .spyOn(service, 'getIntraday')
        .mockResolvedValue({ intradayParams: 'WIP' } as GetResponseDto);

      jest
        .spyOn(globalValidator, 'validate')
        .mockResolvedValue({ validateParams: 'WIP' } as GetResponseDto);

      response = await controller.intraday(
        { ticker: 'SPY' } as IntradayQueryDto,
        res,
      );

      expect(res.json).toBeCalledWith({ validateParams: 'WIP' });
      expect(response).toEqual({ validateParams: 'WIP' });
    });
    it.skip('should return an unsuccessful response', async () => {});
  });
});
