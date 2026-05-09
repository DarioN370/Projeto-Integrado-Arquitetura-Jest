const calcularOrcamento = require('./orcamento')

describe('Suíte de testes: Validação de Orçamentos de Autopeças', () => {
    
    // CASO DE SUCESSO SEM DESCONTO
    it('Deve calcular o orçamento básico sem desconto corretamente', () => {
        // Peças (100) + Mão de Obra (100) = 200. + 5% imposto (sera calculado la na funcrion 10)= 210
        expect(calcularOrcamento(100, 100, 0)).toBe(210)
    })

    // CASO DE SUCESSO COM DESCONTO
    it('Deve aplicar o desconto de 10% corretamente no orçamento', () => {
        // Peças (100) + Mão de Obra (100) = 200. Com 10% de desconto = 180. + 5% imposto (9)= 189
        expect(calcularOrcamento(100, 100, 0.10)).toBe(189)
    })



    // TESTES DE CAIXA-BRANCA (VALIDANDO ERROS)

    // ERRO DE DESCONTO EXCEDIDO
    it('Deve barrar e retornar erro para descontos acima de 15%', () => {
        expect(calcularOrcamento(100, 100, 0.20)).toBe("Erro: Desconto acima do limite permitido")
    })

    // ERRO DE VALORES NEGATIVOS
    it('Deve barrar e retornar erro se houver algum valor negativo', () => {
        expect(calcularOrcamento(-50, 100, 0)).toBe("Erro: Valores inválidos")
    })
    
})