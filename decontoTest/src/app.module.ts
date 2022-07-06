import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContaRepository } from './Repository/conta-repository';
import { MessageBrokerService } from './message-broker/message-broker.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([{
      name: 'GREETING_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'task_queue',
        queueOptions: {
          durable: false
        }
      }
    }])
  ],
  controllers: [AppController],
  providers: [AppService, ContaRepository, MessageBrokerService],
})
export class AppModule {}
