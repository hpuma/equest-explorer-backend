import { TestingModule } from '@nestjs/testing';
import { GlobalValidator } from '@global/validation/validator.class';
import { NewsController } from '../news.controller';
import { NewsService } from '../news.service';
import { res } from '@global/testing/setup';
import { TestSetup, TestClass } from '@global/testing/setup.class';
import { createGetEverythingResponse } from './utils/service-data';
import {
  createEverythingQuery,
  createEverythingResponse,
} from './utils/controller-data';

describe('NewsController', () => {
  let controller: NewsController;
  let service: NewsService;
  let globalValidator: GlobalValidator;
  const testSetup = new TestSetup(TestClass.controller, {
    controller: NewsController,
    service: NewsService,
  });
  beforeAll(async () => {
    const module: TestingModule = await testSetup.getTestingModule({
      getNews: jest.fn(),
    });
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
          .spyOn(service, 'getNews')
          .mockResolvedValueOnce(createGetEverythingResponse());

        const mockGlobalValidatorData = createEverythingResponse();
        jest
          .spyOn(globalValidator, 'validate')
          .mockResolvedValue(mockGlobalValidatorData);

        await controller.everything(createEverythingQuery(), res);
        expect(res.json).toBeCalledWith(mockGlobalValidatorData);
      });
    });
    describe('when an unsuccessful response returned', () => {
      it('should throw when service fails', async () => {
        const serviceErrorMessage = 'Service has encountered an error';
        jest.spyOn(service, 'getNews').mockImplementationOnce(() => {
          throw new Error(serviceErrorMessage);
        });

        await controller.everything(createEverythingQuery(), res);
        expect(res.json).toBeCalledWith({ message: serviceErrorMessage });
      });

      it('should throw when validator fails', async () => {
        const serviceErrorMessage = 'Global Validator has encountered an error';
        jest.spyOn(globalValidator, 'validate').mockImplementationOnce(() => {
          throw new Error(serviceErrorMessage);
        });

        await controller.everything(createEverythingQuery(), res);
        expect(res.json).toBeCalledWith({ message: serviceErrorMessage });
      });
    });
  });
});
