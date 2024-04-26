import { Controller, Get, HttpStatus } from '@nestjs/common'
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger'
import { HealthService } from './health.service'

export class HealthReturnType {
  @ApiProperty({ example: 200 })
  statusCode: number
  @ApiProperty({ example: 'Hello AskSuite World!' })
  message: string
}

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}
  @ApiTags('health')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Caso receba o statusCode 200, a API está ativa!',
    type: HealthReturnType,
  })
  @Get('')
  checkApiHealth() {
    return this.healthService.checkApiHealth()
  }
}
