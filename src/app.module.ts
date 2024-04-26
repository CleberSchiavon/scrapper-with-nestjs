import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScraperController } from 'modules/scraper/scraper.controller'
import { ScraperService } from 'modules/scraper/scraper.service'
import { BrowserService } from 'modules/browser/browser.service'
import { AppController } from './app.controller'
import { HTTPLoggerInterceptor } from 'middlewares/http.logger.middleware'
import { HealthService } from 'modules/health/health.service'
import { HealthController } from 'modules/health/health.controller'
@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [HealthController, ScraperController, AppController],
  providers: [HealthService, ScraperService, BrowserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HTTPLoggerInterceptor).forRoutes('*')
  }
}
