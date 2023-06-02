import { GlobalModule } from '@global/global.module';
import { Test, TestingModule } from '@nestjs/testing';
import { AlphavApiService } from '@alphav/api/alphav-api.service';
import { AlphavController } from '@alphav/alphav.controller';
import { AlphavService } from '@alphav/alphav.service';

export async function getTestingModule(testType: string) {
  const testModule: any = {
    imports: getImportsByType(testType),
    controllers: getControllerByType(testType),
    providers: getProviderByType(testType),
  };

  return (await Test.createTestingModule(
    testModule,
  ).compile()) as TestingModule;
}

function getImportsByType(testType: string) {
  const usesGlobalValidator = testType === 'controller' || testType === 'api';
  return usesGlobalValidator ? [GlobalModule] : [];
}

function getControllerByType(testType: string) {
  const isTypeController = testType === 'controller';
  return isTypeController ? [AlphavController] : [];
}

function getProviderByType(testType: string) {
  switch (testType) {
    case 'controller':
    case 'service':
      return [
        AlphavService,
        {
          provide: AlphavService,
          useValue: {
            getIntraday: jest.fn(),
            getGlobalQuote: jest.fn(),
            getTickerSearch: jest.fn(),
            getNews: jest.fn(),
          },
        },
      ];
    case 'api':
      return [
        AlphavApiService,
        { provide: AlphavApiService, useValue: { get: jest.fn() } },
      ];
    default:
      return [];
  }
}
