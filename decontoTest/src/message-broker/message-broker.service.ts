import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MessageBrokerService {
    constructor(@Inject('GREETING_SERVICE') private client: ClientProxy){}

    async publishEvent(conta: any) {
        this.client.emit('task_queue', JSON.stringify(conta));
    }
}
