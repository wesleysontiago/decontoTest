import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://guest:guest@localhost:5672`],
      queue: 'task_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  app.startAllMicroservices();

  await app.listen(3001);

}
bootstrap();
