const calcularOrcamento = require('./orcamento');
const enviarWhatsApp = require('./enviarWhatsApp');

// Substitui o envio real de WhatsApp por um dublê vazio
jest.mock('./enviarWhatsApp');

describe('Suíte de testes: Validação de Orçamentos de Autopeças', () => {

    it('Deve calcular o orçamento básico sem desconto corretamente', () => {
        const orcamentoRetornado = calcularOrcamento(100,100,0);
        const orcamentoEsperado = {
            pecas: 100,
            maoDeObra: 100,
            total: 210,
            status: 'Orcamento Valido',
            notificacao: 'Não solicitado' // novo campo
        };
        expect(orcamentoRetornado).toEqual(orcamentoEsperado);
    });

    it('Deve aplicar o desconto de 10% corretamente no orçamento', () => {
        const orcamentoRetornado = calcularOrcamento(100, 100, 0.10);
        expect(orcamentoRetornado.pecas).toBe(100);
        expect(orcamentoRetornado.total).toBe(189);
        expect(orcamentoRetornado.status).toBe('Orcamento Valido');
    });

    it('Deve barrar e retornar erro para descontos acima de 15%', () => {
        const orcamentoRetornado = calcularOrcamento(100, 100, 0.20);
        expect(orcamentoRetornado).toBe("Erro: Desconto acima do limite permitido");
    });

    it('Deve barrar valores negativos', () => {
        const orcamentoRetornado = calcularOrcamento(-50, 100, 0);
        expect(orcamentoRetornado).toBe("Erro: Valores inválidos");
    });

    // --- TESTES USANDO MOCK ---

    describe('Testes de Integração com WhatsApp (Mocks)', () => {
        it('Deve marcar notificação como "Mensagem Enviada" quando o disparo for bem-sucedido', () => {
            // Força o dublê a retornar TRUE
            enviarWhatsApp.mockReturnValue(true);

            // Simulamos o balconista digitando o telefone do cliente
            const resultado = calcularOrcamento(100, 100, 0, "19999999999");

            expect(resultado.notificacao).toBe("Mensagem Enviada");
            // O Jest verifica se o mock foi chamado com os dados certos 
            expect(enviarWhatsApp).toHaveBeenCalledWith("19999999999", 210);
        });

        it('Deve marcar notificação como "Falha no Envio" quando a API do WhatsApp cair', () => {
            // Força o dublê a retornar FALSE, simula a queda de servidor
            enviarWhatsApp.mockReturnValue(false);

            const resultado = calcularOrcamento(100, 100, 0, "19999999999");

            expect(resultado.notificacao).toBe("Falha no Envio");
        });
    });
});