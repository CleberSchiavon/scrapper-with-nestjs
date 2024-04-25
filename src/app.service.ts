import { HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  checkApiHealth() {
    return {
      statusCode: HttpStatus.OK,
      message: "Hello AskSuite World!",
    };
  }
}
