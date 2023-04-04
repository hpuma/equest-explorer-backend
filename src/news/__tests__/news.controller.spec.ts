import { GlobalValidator } from '@global/global-validator.class';
import { NewsController } from '../news.controller';
import { NewsService } from '../news.service';
import { res } from '@global/testing/test-setup';
import { getTestingModule } from './utils/test-setup';
import { createGetEverythingResponse } from './utils/service-data';
import {
  createEverythingQuery,
  createEverythingResponse,
} from './utils/controller-data';

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
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('when everything()', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });
    describe('when a successful response is returned', () => {
      it('should return a successful response when all dtos are valid', async () => {
        jest
          .spyOn(service, 'getEverything')
          .mockResolvedValueOnce(createGetEverythingResponse());

        const mockGlobalValidatorData = createEverythingResponse();
        jest
          .spyOn(globalValidator, 'validate')
          .mockResolvedValueOnce(mockGlobalValidatorData);

        response = await controller.everything(createEverythingQuery(), res);

        expect(res.json).toBeCalledWith(mockGlobalValidatorData);
        expect(response).toEqual(mockGlobalValidatorData);
      });
    });
    describe('when an unsuccessful response returned', () => {
      it('should throw when service fails', async () => {
        const serviceErrorMessage = 'Service has encountered an error';
        jest.spyOn(service, 'getEverything').mockImplementationOnce(() => {
          throw new Error(serviceErrorMessage);
        });

        response = await controller.everything(createEverythingQuery(), res);
        expect(res.json).toBeCalledWith({ message: serviceErrorMessage });
      });

      it('should throw when validator fails', async () => {
        const serviceErrorMessage = 'Global Validator has encountered an error';
        jest.spyOn(globalValidator, 'validate').mockImplementationOnce(() => {
          throw new Error(serviceErrorMessage);
        });

        response = await controller.everything(createEverythingQuery(), res);
        expect(res.json).toBeCalledWith({ message: serviceErrorMessage });
      });
    });
  });
});
