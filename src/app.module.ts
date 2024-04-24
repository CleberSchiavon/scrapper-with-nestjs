import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScraperController } from "controllers/scraper/scraper.controller";
import { ScraperService } from "services/scraper/ScraperService";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, ScraperController],
  providers: [AppService, ScraperService],
})
export class AppModule {}
