import { GlobalModule } from '@global/global.module';
import { Test, TestingModule } from '@nestjs/testing';
import { NewsApiService } from '@news/api/news-api.service';
import { NewsController } from '@news/news.controller';
import { NewsService } from '@news/news.service';

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
  return testType === 'controller' ? [NewsController] : [];
}

function getProviderByType(testType: string) {
  switch (testType) {
    case 'controller':
    case 'service':
      return [
        NewsService,
        { provide: NewsService, useValue: { getEverything: jest.fn() } },
      ];
    case 'api':
      return [
        NewsApiService,
        { provide: NewsApiService, useValue: { getEverything: jest.fn() } },
      ];
    default:
      return [];
  }
}
