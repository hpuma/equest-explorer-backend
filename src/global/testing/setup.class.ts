import { GlobalModule } from '@global/global.module';
import { Test, TestingModule } from '@nestjs/testing';
type ServiceMethods = Record<any, jest.Mock<any, any>>;

export default class TestSetup {
  controller: any;
  service: any;
  apiService: any;

  constructor({ controller = {}, service = {}, apiService = {} }) {
    this.controller = controller;
    this.service = service;
    this.apiService = apiService;
  }
  async getTestingModule(testType: string, serviceMethods: ServiceMethods) {
    const testModule: any = {
      imports: this.getImportsByType(testType),
      controllers: this.getControllerByType(testType),
      providers: this.getProviderByType(testType, serviceMethods),
    };

    return (await Test.createTestingModule(
      testModule,
    ).compile()) as TestingModule;
  }

  getImportsByType(testType: string) {
    const usesGlobalValidator = testType === 'controller' || testType === 'api';
    return usesGlobalValidator ? [GlobalModule] : [];
  }

  getControllerByType(testType: string) {
    const isTypeController = testType === 'controller';
    return isTypeController ? [this.controller] : [];
  }

  getProviderByType(testType: string, serviceMethods: ServiceMethods) {
    switch (testType) {
      case 'controller':
      case 'service':
        return [
          this.service,
          {
            provide: this.service,
            useValue: serviceMethods,
          },
        ];
      case 'api':
        return [
          this.apiService,
          { provide: this.apiService, useValue: serviceMethods },
        ];
      default:
        return [];
    }
  }
}
