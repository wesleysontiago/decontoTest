import { createConta } from "src/model/conta"

const contas : createConta[] = []

export class ContaRepository {
    async cadastrar(conta: createConta) : Promise<createConta[]>{
        contas.push(conta);
        return contas;
    }

    async listar(): Promise<createConta[]> {
        return contas
    }

    async deposit(dados:any): Promise<any> {
        const index = contas.findIndex((data) => data.agencia === dados.agencia && data.conta === dados.conta)
        contas[index].saldo = contas[index].saldo + parseInt(dados.valor)
        return contas[index]
    }

    async saque(dados:any): Promise<any> {
        const index = contas.findIndex((data) => data.agencia === dados.agencia && data.conta === dados.conta)
        contas[index].saldo = contas[index].saldo - parseInt(dados.valor)
        return contas[index]
    }
}
