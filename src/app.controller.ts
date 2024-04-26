import { Controller, Get, HttpStatus } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { HealthService } from 'modules/health/health.service'
import { HealthReturnType } from 'types/health'

@Controller('')
export class AppController {
  constructor(private readonly healthService: HealthService) {}
  @Get('')
  @ApiTags('Common Routes')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Caso receba o statusCode 200, a API está ativa!',
    type: HealthReturnType,
  })
  checkApiHealth() {
    return this.healthService.checkApiHealth()
  }
}
