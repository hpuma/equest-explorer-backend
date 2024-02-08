import { TestingModule } from '@nestjs/testing';
import { TheNewsController } from '../thenews.controller';
import { TheNewsService } from '../thenews.service';
import { TestSetup, TestClass } from '@global/testing/setup.class';
describe('TheNewsController', () => {
  let controller: TheNewsController;
  const testSetup = new TestSetup(TestClass.controller, {
    controller: TheNewsController,
    service: TheNewsService,
  });
  beforeAll(async () => {
    const module: TestingModule = await testSetup.getTestingModule({
      news: jest.fn(),
    });
    controller = module.get<TheNewsController>(TheNewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
