import { Module } from "@nestjs/common";
import { ScraperController } from "controllers/scraper/scraper.controller";
import { ScraperService } from "services/scraper/ScraperService";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [],
  controllers: [AppController, ScraperController],
  providers: [AppService, ScraperService],
})
export class AppModule {}
