import { GlobalModule } from '@global/global.module';
import { Test, TestingModule } from '@nestjs/testing';

type ServiceMethods = Record<any, jest.Mock<any, any>>;

export enum TestClass {
  controller = 'controller',
  service = 'service',
  api = 'api',
}

export class TestSetup {
  private testClass: TestClass;
  private isTestClassController: boolean;
  controller: any;
  service: any;
  apiService: any;

  constructor(
    testClass: TestClass,
    { controller = {}, service = {}, apiService = {} },
  ) {
    this.testClass = testClass;
    this.controller = controller;
    this.service = service;
    this.apiService = apiService;
    this.isTestClassController = this.testClass === TestClass.controller;
  }

  async getTestingModule(serviceMethods: ServiceMethods) {
    const testModule: any = {
      imports: this.getImportsByType(),
      controllers: this.getControllerByType(),
      providers: this.getProviderByType(serviceMethods),
    };

    return await Test.createTestingModule(testModule).compile();
  }

  getImportsByType() {
    const usesGlobalValidator =
      this.isTestClassController || this.testClass === TestClass.api;
    return usesGlobalValidator ? [GlobalModule] : [];
  }

  getControllerByType() {
    return this.isTestClassController ? [this.controller] : [];
  }

  getProviderByType(serviceMethods: ServiceMethods) {
    switch (this.testClass) {
      case TestClass.controller:
      case TestClass.service:
        return [
          this.service,
          {
            provide: this.service,
            useValue: serviceMethods,
          },
        ];
      case TestClass.api:
        return [
          this.apiService,
          { provide: this.apiService, useValue: serviceMethods },
        ];
      default:
        return [];
    }
  }
}
