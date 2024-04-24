import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { INestApplication } from "@nestjs/common";

const port: string | 8080 = process.env.PORT || 8080;

async function bootstrap(): Promise<void> {
  const app: INestApplication<any> = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`Listening on port ${port}`);
}
bootstrap();
