import { createFolha } from "src/model/folha";

export interface CadastrarFolhaRepository {
    cadastrar: (folha: createFolha) => Promise<createFolha[]>
}
