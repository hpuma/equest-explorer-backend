import { TestingModule } from '@nestjs/testing';
import { AlphavApiService } from '../api/alphav-api.service';
import { TestSetup, TestClass } from '@global/testing/setup.class';

describe('ApiService', () => {
  let service: AlphavApiService;
  const testSetup = new TestSetup(TestClass.api, {
    apiService: AlphavApiService,
  });
  beforeAll(async () => {
    const module: TestingModule = await testSetup.getTestingModule({
      get: jest.fn(),
    });

    service = module.get<AlphavApiService>(AlphavApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
