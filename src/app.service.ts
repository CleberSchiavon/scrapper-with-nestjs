import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getAskSuiteHello(): string {
    return "Hello Asksuite World!";
  }
}
