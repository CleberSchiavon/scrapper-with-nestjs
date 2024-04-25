import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScraperController } from "modules/scraper/scraper.controller";
import { ScraperService } from "modules/scraper/scraper.service";
import { BrowserService } from "modules/browser/browser.service";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { HTTPLoggerInterceptor } from "middlewares/http.logger.middleware";
@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, ScraperController],
  providers: [AppService, ScraperService, BrowserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HTTPLoggerInterceptor).forRoutes("*");
  }
}
