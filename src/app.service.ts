import { Injectable } from '@nestjs/common';
import { createFolha } from './model/folha';
import { FolhaRepository } from './Repository/folha-repository';

@Injectable()
export class AppService {
  constructor(private readonly folhaRepository: FolhaRepository) {}
    
  getFolhas(): Promise<createFolha[]> {
    return this.folhaRepository.listar()
  }

  async create(folha: createFolha): Promise<createFolha[]> {
    return this.folhaRepository.cadastrar(folha)
  }

  async getFolhaBy(cpf: string, mes: number, ano: number) {
    return this.folhaRepository.getFolhasBy(cpf, mes, ano)
    
  }
}
