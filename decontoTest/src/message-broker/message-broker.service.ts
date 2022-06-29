import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MessageBrokerService {
    constructor(@Inject('GREETING_SERVICE') private client: ClientProxy){}

    async publishEvent(folha: any) {
        this.client.emit('folha-created', JSON.stringify(folha));
    }
}
