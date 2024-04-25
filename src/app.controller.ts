import { Controller, Get, HttpStatus } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger";

export class HealthReturnType {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: "Hello AskSuite World!" })
  message: string;
}
@Controller("")
export class AppController {
  constructor(private readonly appService: AppService) {}
  @ApiTags("health")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Caso receba o statusCode 200, a API está ativa!",
    type: HealthReturnType,
  })
  @Get("/health")
  checkApiHealth() {
    return this.appService.checkApiHealth();
  }
}
