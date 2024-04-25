import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScraperController } from "controllers/scraper/scraper.controller";
import { ScraperService } from "services/scraper/scraper.service";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BrowserService } from "services/browser/browser.service";
import { HTTPLoggerInterceptor } from "./middlewares/http.logger.middleware";
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
