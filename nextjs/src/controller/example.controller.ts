import { ExampleModule } from '../module/example.module';
import { ExampleService } from '../service/example.service';

export class ExampleController {
  private readonly exampleModule = new ExampleModule(new ExampleService());

  getMessage(): string {
    return this.exampleModule.getMessage();
  }
}
