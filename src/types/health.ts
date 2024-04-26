import { ApiProperty } from '@nestjs/swagger'

export class HealthReturnType {
  @ApiProperty({ example: 200 })
  statusCode: number
  @ApiProperty({ example: 'Hello AskSuite World!' })
  message: string
}
