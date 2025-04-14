import { ExampleService } from '../service/example.service';

export class ExampleModule {
  constructor(private readonly exampleService: ExampleService) {}

  getMessage(): string {
    return this.exampleService.getMessage();
  }
}
