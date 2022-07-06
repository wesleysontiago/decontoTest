import { createConta } from "src/model/conta";

export interface CadastrarContaRepository {
    cadastrar: (conta: createConta) => Promise<createConta[]>
}