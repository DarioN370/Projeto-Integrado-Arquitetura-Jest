const calcularOrcamento = require('./orcamento')

describe('Suíte de testes: Validação de Orçamentos de Autopeças', () => {

    // CADA IT VAI SER UM "TIPO" DE TESTE
    
    // CASO DE SUCESSO SEM DESCONTO (USANDO O TO EQUAL)
    it('Deve calcular o orçamento básico sem desconto corretamente', () => {
        // Peças (100) + Mão de Obra (100) = 200. + 5% imposto (sera calculado la na funcrion 10)= 210
        const orcamentoRetornado = calcularOrcamento(100,100,0)

        //Aqui eu vou criar o objeto com a estrutura que a function retorna la no outro arquivo
        const orcamentoEsperado = {
            pecas: 100,
            maoDeObra: 100,
            total: 210,
            status: 'Orcamento Valido'
        }

        // !!!!!!!! aqui é onde eu mudei do TOBE para o TO EQUAL !!!!!!!!!
        expect(orcamentoRetornado).toEqual(orcamentoEsperado)
    })

    // CASO DE SUCESSO COM DESCONTO (varios excepts e .toBe para propriedades)
    it('Deve aplicar o desconto de 10% corretamente no orçamento', () => {
        const orcamentoRetornado = calcularOrcamento(100, 100, 0.10)
        // Fazendo de um jeito que eu testo propriedade por propriedade usando o toBe
        expect(orcamentoRetornado.pecas).toBe(100)
        expect(orcamentoRetornado.total).toBe(189)
        expect(orcamentoRetornado.status).toBe('Orcamento Valido')
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