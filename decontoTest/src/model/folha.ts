// export type createFolha = {
//     mes: number
//     ano: number
//     horas: number
//     valor: number
//     funcionario: Object
// }

export type createFolha = {
    mes: number
    ano: number
    horas: number
    valor: number
    bruto: number
    irrf: number
    inss: number
    fgts: number
    liquido: number
    funcionario: {
        nome: string
        cpf: string
    }
}