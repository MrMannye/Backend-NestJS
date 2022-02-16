import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/datos')
  getQuery(@Query() params: any): string {
    return `Nombre: ${params.name} Age: ${params.age}`;
  }
}
