import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { MessageBrokerService } from './message-broker/message-broker.service';
import { createConta } from './model/conta';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly messageBroker: MessageBrokerService) {}

  @Post('/conta/cadastrar')
  async create(@Body() conta: createConta): Promise<createConta[]> {
    const resp = this.appService.create(conta)
    await this.messageBroker.publishEvent(conta)
    return resp
  }

  @Put('/conta/depositar/:agencia/:conta/:valor')
  async depositar(@Param() dados:string): Promise<any> {
    const response = await this.appService.depositar(dados)
    await this.messageBroker.publishEvent(response)
    return response
  }

  @Put('/conta/sacar/:agencia/:conta/:valor')
  async sacar(@Param() dados:string): Promise<any> {
    const response = await this.appService.sacar(dados)
    await this.messageBroker.publishEvent(response)
    return response
  }
}
