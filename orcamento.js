const enviarWhatsApp = require('./enviarWhatsApp');

function calcularOrcamento(valorPecas, valorMaoDeObra, desconto, telefoneCliente = null) {
    const percentualImposto = 0.05; // 5% de imposto (ISS)
    const descontoMaximo = 0.15;   // Desconto máximo de 15%

    // Regra de Negócio: O desconto não pode ser maior que 15% (0.15)
    if (desconto > descontoMaximo) {
        return "Erro: Desconto acima do limite permitido";
    } 

    // Regra de Negócio: Valores não podem ser negativos
    if (valorPecas < 0 || valorMaoDeObra < 0 || desconto < 0) {
        return "Erro: Valores inválidos";
    } 

    // calculos para puxar na function
    const subtotal = valorPecas + valorMaoDeObra;
    const valorComDesconto = subtotal - (subtotal * desconto);
    const imposto = valorComDesconto * percentualImposto;
    const totalFinal = valorComDesconto + imposto;

    // NOVIDADE: Disparo de WhatsApp caso o balconista digite o telefone
    let statusWhatsApp = "Não solicitado";
    if (telefoneCliente) {
        const envioSucesso = enviarWhatsApp(telefoneCliente, totalFinal);
        statusWhatsApp = envioSucesso ? "Mensagem Enviada" : "Falha no Envio";
    }

    return {
        pecas: valorPecas,
        maoDeObra: valorMaoDeObra,
        total: totalFinal,
        status: 'Orcamento Valido',
        notificacao: statusWhatsApp
    }
}

module.exports = calcularOrcamento;