import { NestFactory } from '@nestjs/core'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

const port: string | 8080 = process.env.PORT || 8080

async function bootstrap(): Promise<void> {
  const app: INestApplication<any> = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Hotel Crawler Swagger')
    .setDescription('Bem vindo a documentação dessa API no Swagger!')
    .setVersion('1.0')
    .setContact(
      'Cleber Henrique',
      'https://github.com/cleberschiavon',
      'cleberschiavon@outlook.com',
    )
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)
  app.useGlobalPipes(new ValidationPipe()) // Adicionando validadores de DTO's aqui
  await app.listen(port)
  console.log(`Listening on port ${port}`)
}
bootstrap()
