import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { createFolha } from './model/folha';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/folha/calcular')
  async getFolhaCalculo() {
    const folhas = await this.appService.getFolhas()
    let folhasSend = []
    folhas.forEach(item => {
      const bruto = item.horas * item.valor
      let irrf
      if (bruto > 1903.99 && bruto < 2826.65) {
        irrf = ((bruto / 100) * 7.5) - 142.80
      } else if (bruto > 2826.66 && bruto < 3751.05) {
        irrf = ((bruto / 100) * 15) - 354.80
      } else if (bruto > 3751.06 && bruto < 4664.68) {
        irrf = ((bruto / 100) * 22.5) - 636.13
      } else if (bruto > 4664.68) {
        irrf = ((bruto / 100) * 27.5) - 869.36
      } else {
        irrf = 0
      }

      let inss
      if (bruto < 1693.72) {
        inss = (bruto / 100) * 8
      } else if (bruto > 1693.32 && bruto < 2822.90) {
        inss = (bruto / 100) * 9
      } else if (bruto > 2822.91 && bruto < 5645.80) {
        inss = (bruto / 100) * 11
      } else if (bruto > 5645.81) {
        inss = 621.03
      }

      let fgts = (bruto / 100) * 8
      let liquido = (bruto - irrf - inss)

      const obj = {
        "mes": item.mes,
        "ano": item.ano,
        "horas": item.horas,
        "valor": item.valor,
        "bruto": bruto,
        "irrf": irrf,
        "inss": inss,
        "fgts": fgts,
        "liquido": liquido,
        "funcionario": item.funcionario
      }
      folhasSend.push(obj)
    })
    
    return folhasSend
  }

  @Post('/folha/cadastrar')
  create(@Body() folha: createFolha): Promise<createFolha[]> {
     return this.appService.create(folha)
  }

  @Get('/folha/:cpf/:mes/:ano')
  async getFolhaBy(@Param() cpf: string, mes: number, ano: number) {
    return this.appService.getFolhaBy(cpf, mes, ano)
  }
}
