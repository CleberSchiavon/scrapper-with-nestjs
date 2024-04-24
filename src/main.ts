import { NestFactory } from "@nestjs/core";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { APP_ENVS } from "utils/constants";

const port: string | 8080 = APP_ENVS.PORT || 8080;

async function bootstrap(): Promise<void> {
  const app: INestApplication<any> = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // Adicionando validadores de DTO's aqui
  await app.listen(port);
  console.log(`Listening on port ${port}`);
}
bootstrap();
