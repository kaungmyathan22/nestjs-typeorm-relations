import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello (): Promise<string> {
    return this.appService.seed();
  }

  @Get(':id')
  getEmployeeById (@Param('id') id: number) {
    return this.appService.getEmployeeById(id);
  }
}
