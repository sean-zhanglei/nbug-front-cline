import { ExampleController } from '../example.controller';
import { ExampleModule } from '../../module/example.module';
import { ExampleService } from '../../service/example.service';

jest.mock('../../module/example.module');
jest.mock('../../service/example.service');

describe('ExampleController', () => {
  let controller: ExampleController;
  let mockModule: jest.Mocked<ExampleModule>;
  let mockService: jest.Mocked<ExampleService>;

  beforeEach(() => {
    mockService = {
      getMessage: jest.fn().mockReturnValue('Mocked service message')
    } as unknown as jest.Mocked<ExampleService>;

    mockModule = new ExampleModule(mockService) as jest.Mocked<ExampleModule>;
    mockModule.getMessage.mockReturnValue('Mocked module message');

    controller = new ExampleController();
  });

  describe('getMessage', () => {
    it('should return message from module', () => {
      const result = controller.getMessage();
      expect(result).toBe('Mocked module message');
      expect(mockModule.getMessage).toHaveBeenCalled();
    });
  });
});
