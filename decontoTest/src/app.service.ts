import { Injectable } from '@nestjs/common';
import { createConta } from './model/conta';
import { ContaRepository } from './Repository/conta-repository';

@Injectable()
export class AppService {
  constructor(private readonly contaRepository: ContaRepository) {}
    
  getContas(): Promise<createConta[]> {
    return this.contaRepository.listar()
  }

  async create(conta: createConta): Promise<createConta[]> {
    return this.contaRepository.cadastrar(conta)
  }

  async depositar(dados:any): Promise<any> {
    return this.contaRepository.deposit(dados)
  }

  async sacar(dados:any): Promise<any> {
    return this.contaRepository.saque(dados)
  }
}
