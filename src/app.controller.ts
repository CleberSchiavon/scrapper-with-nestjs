import { Controller, Get } from "@nestjs/common";
import { HealthService } from "modules/health/health.service";

@Controller("")
export class AppController {
  constructor(private readonly healthService: HealthService) {}
  @Get("")
  checkApiHealth() {
    return this.healthService.checkApiHealth();
  }
}
