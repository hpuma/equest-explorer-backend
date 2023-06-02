import { GlobalValidator } from '@global/global-validator.class';
import { res } from '@global/testing/setup';
import { getTestingModule } from './utils/test-setup';
import { createGetResponse } from './utils/service-data';
import {
  createIntradayQuery,
  createIntradayResponse,
  createGlobalQuoteQuery,
  createGlobalQuoteResponse,
  createTickerSearchQuery,
  createTickerSearchResponse,
  createGetNewsQuery,
  createNewsSentimentResponseDto,
} from './utils/controller-data';
import { AlphavController } from '@alphav/alphav.controller';
import { AlphavService } from '@alphav/alphav.service';

describe('AlphavController', () => {
  let controller: AlphavController;
  let service: AlphavService;
  let response;
  let globalValidator: GlobalValidator;
  const serviceErrorMessage = 'Service has encountered an error';
  const validatorErrorMessage = 'Global Validator has encountered an error';
  beforeEach(async () => {
    const module = await getTestingModule('controller');
    controller = module.get<AlphavController>(AlphavController);
    service = module.get<AlphavService>(AlphavService);
    globalValidator = module.get<GlobalValidator>(GlobalValidator);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('when globalquote()', () => {
    describe('when a successful response is returned', () => {
      it('should return a successful response when all dtos are valid', async () => {
        jest
          .spyOn(service, 'getGlobalQuote')
          .mockResolvedValueOnce(createGetResponse());

        const mockGlobalValidatorData = createGlobalQuoteResponse();
        jest
          .spyOn(globalValidator, 'validate')
          .mockResolvedValueOnce(mockGlobalValidatorData);

        response = await controller.globalquote(createGlobalQuoteQuery(), res);

        expect(res.json).toBeCalledWith(mockGlobalValidatorData);
        expect(response).toEqual(mockGlobalValidatorData);
      });
    });
    describe('when an unsuccessful response returned', () => {
      it('should throw when service fails', async () => {
        jest.spyOn(service, 'getGlobalQuote').mockImplementationOnce(() => {
          throw new Error(serviceErrorMessage);
        });

        response = await controller.globalquote(createGlobalQuoteQuery(), res);
        expect(res.json).toBeCalledWith({ message: serviceErrorMessage });
      });

      it('should throw when validator fails', async () => {
        jest.spyOn(globalValidator, 'validate').mockImplementationOnce(() => {
          throw new Error(validatorErrorMessage);
        });

        response = await controller.globalquote(createGlobalQuoteQuery(), res);
        expect(res.json).toBeCalledWith({ message: validatorErrorMessage });
      });
    });
  });
  describe('when intraday()', () => {
    describe('when a successful response is returned', () => {
      it('should return a successful response when all dtos are valid', async () => {
        jest
          .spyOn(service, 'getIntraday')
          .mockResolvedValueOnce(createGetResponse());

        const mockGlobalValidatorData = createIntradayResponse();
        jest
          .spyOn(globalValidator, 'validate')
          .mockResolvedValueOnce(mockGlobalValidatorData);

        response = await controller.intraday(createIntradayQuery(), res);

        expect(res.json).toBeCalledWith(mockGlobalValidatorData);
        expect(response).toEqual(mockGlobalValidatorData);
      });
    });
    describe('when an unsuccessful response returned', () => {
      it('should throw when service fails', async () => {
        jest.spyOn(service, 'getIntraday').mockImplementationOnce(() => {
          throw new Error(serviceErrorMessage);
        });

        response = await controller.intraday(createIntradayQuery(), res);
        expect(res.json).toBeCalledWith({ message: serviceErrorMessage });
      });

      it('should throw when validator fails', async () => {
        jest.spyOn(globalValidator, 'validate').mockImplementationOnce(() => {
          throw new Error(validatorErrorMessage);
        });

        response = await controller.intraday(createIntradayQuery(), res);
        expect(res.json).toBeCalledWith({ message: validatorErrorMessage });
      });
    });
  });
  describe('when news()', () => {
    describe('when a successful response is returned', () => {
      it('should return a successful response when all dtos are valid', async () => {
        jest
          .spyOn(service, 'getNews')
          .mockResolvedValueOnce(createGetResponse());

        const mockGlobalValidatorData = createNewsSentimentResponseDto();
        jest
          .spyOn(globalValidator, 'validate')
          .mockResolvedValueOnce(mockGlobalValidatorData);

        response = await controller.news(createGetNewsQuery(), res);

        expect(res.json).toBeCalledWith(mockGlobalValidatorData);
        expect(response).toEqual(mockGlobalValidatorData);
      });
    });
    describe('when an unsuccessful response returned', () => {
      it('should throw when service fails', async () => {
        jest.spyOn(service, 'getNews').mockImplementationOnce(() => {
          throw new Error(serviceErrorMessage);
        });

        response = await controller.news(createGetNewsQuery(), res);
        expect(res.json).toBeCalledWith({ message: serviceErrorMessage });
      });

      it('should throw when validator fails', async () => {
        jest.spyOn(globalValidator, 'validate').mockImplementationOnce(() => {
          throw new Error(validatorErrorMessage);
        });

        response = await controller.news(createGetNewsQuery(), res);
        expect(res.json).toBeCalledWith({ message: validatorErrorMessage });
      });
    });
  });
  describe('when tickersearch()', () => {
    describe('when a successful response is returned', () => {
      it('should return a successful response when all dtos are valid', async () => {
        jest
          .spyOn(service, 'getTickerSearch')
          .mockResolvedValueOnce(createGetResponse());

        const mockGlobalValidatorData = createTickerSearchResponse();
        jest
          .spyOn(globalValidator, 'validate')
          .mockResolvedValueOnce(mockGlobalValidatorData);

        response = await controller.tickersearch(
          createTickerSearchQuery(),
          res,
        );

        expect(res.json).toBeCalledWith(mockGlobalValidatorData);
        expect(response).toEqual(mockGlobalValidatorData);
      });
    });
    describe('when an unsuccessful response returned', () => {
      it('should throw when service fails', async () => {
        jest.spyOn(service, 'getTickerSearch').mockImplementationOnce(() => {
          throw new Error(serviceErrorMessage);
        });

        response = await controller.tickersearch(
          createTickerSearchQuery(),
          res,
        );
        expect(res.json).toBeCalledWith({ message: serviceErrorMessage });
      });

      it('should throw when validator fails', async () => {
        jest.spyOn(globalValidator, 'validate').mockImplementationOnce(() => {
          throw new Error(validatorErrorMessage);
        });

        response = await controller.tickersearch(
          createTickerSearchQuery(),
          res,
        );
        expect(res.json).toBeCalledWith({ message: validatorErrorMessage });
      });
    });
  });
});
