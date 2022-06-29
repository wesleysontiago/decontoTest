import { createFolha } from "src/model/folha"

const folhas : createFolha[] = []

export class FolhaRepository {
    async cadastrar(folha: createFolha) : Promise<createFolha[]>{
        folhas.push(folha);
        return folhas;
    }

    async listar(): Promise<createFolha[]> {
        return folhas
    }

    async getFolhasBy(cpf: string, mes: number, ano: number) {
        const folha = folhas.find(folha => {
            if (folha.funcionario.cpf == cpf && folha.mes == mes && folha.ano == ano) {
                return folha
            }
        })
    }
}
