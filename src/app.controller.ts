import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  async getServiceStatus() {
    return { status: 'OK' };
  }
}
