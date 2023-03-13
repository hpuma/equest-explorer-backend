import { GlobalValidator } from '@global/validation/global-validator.class';
import { res } from '@global/testing/test-setup';
import { getTestingModule } from './utils/test-setup';
import { createGetResponse } from './utils/service-data';
import {
  createIntradayQuery,
  createIntradayResponse,
  createGlobalQuoteQuery,
  createGlobalQuoteResponse,
  createTickerSearchQuery,
  createTickerSearchResponse,
} from './utils/controller-data';
import { AlphavController } from '@alphav/alphav.controller';
import { AlphavService } from '@alphav/alphav.service';

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

  beforeEach(() => {
    jest.resetAllMocks();
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
        const serviceErrorMessage = 'Service has encountered an error';
        jest.spyOn(service, 'getIntraday').mockImplementationOnce(() => {
          throw new Error(serviceErrorMessage);
        });

        response = await controller.intraday(createIntradayQuery(), res);
        expect(res.json).toBeCalledWith({ message: serviceErrorMessage });
      });

      it('should throw when validator fails', async () => {
        const serviceErrorMessage = 'Global Validator has encountered an error';
        jest.spyOn(globalValidator, 'validate').mockImplementationOnce(() => {
          throw new Error(serviceErrorMessage);
        });

        response = await controller.intraday(createIntradayQuery(), res);
        expect(res.json).toBeCalledWith({ message: serviceErrorMessage });
      });
    });
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
        const serviceErrorMessage = 'Service has encountered an error';
        jest.spyOn(service, 'getGlobalQuote').mockImplementationOnce(() => {
          throw new Error(serviceErrorMessage);
        });

        response = await controller.globalquote(createGlobalQuoteQuery(), res);
        expect(res.json).toBeCalledWith({ message: serviceErrorMessage });
      });

      it('should throw when validator fails', async () => {
        const serviceErrorMessage = 'Global Validator has encountered an error';
        jest.spyOn(globalValidator, 'validate').mockImplementationOnce(() => {
          throw new Error(serviceErrorMessage);
        });

        response = await controller.globalquote(createGlobalQuoteQuery(), res);
        expect(res.json).toBeCalledWith({ message: serviceErrorMessage });
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
        const serviceErrorMessage = 'Service has encountered an error';
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
        const serviceErrorMessage = 'Global Validator has encountered an error';
        jest.spyOn(globalValidator, 'validate').mockImplementationOnce(() => {
          throw new Error(serviceErrorMessage);
        });

        response = await controller.tickersearch(
          createTickerSearchQuery(),
          res,
        );
        expect(res.json).toBeCalledWith({ message: serviceErrorMessage });
      });
    });
  });
});
