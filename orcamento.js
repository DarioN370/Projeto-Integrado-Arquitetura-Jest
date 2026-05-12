function calcularOrcamento(valorPecas, valorMaoDeObra, desconto) {
    const percentualImposto = 0.05; // 5% de imposto (ISS)
    const descontoMaximo = 0.15;   // Desconto máximo de 15%

    // Regra de Negócio: O desconto não pode ser maior que 15% (0.15)
    if (desconto > descontoMaximo) {
        return "Erro: Desconto acima do limite permitido";
    } // Se o valor do desconto for maior que o descontoMaximo, vai dar erro

    // Regra de Negócio: Valores não podem ser negativos
    if (valorPecas < 0 || valorMaoDeObra < 0 || desconto < 0) {
        return "Erro: Valores inválidos";
    } // Se qualquer valor for menor que 0 (negativo), vai dar erro

    // calculos para puxar na function
    const subtotal = valorPecas + valorMaoDeObra;
    const valorComDesconto = subtotal - (subtotal * desconto);
    const imposto = valorComDesconto * percentualImposto;
    const totalFinal = valorComDesconto + imposto;

    // Retorna apenas o valor total final, AQUI É ANTES DE USAR O TO EQUAL
    // return valorComDesconto + imposto;

    return{
        pecas: valorPecas,
        maoDeObra: valorMaoDeObra,
        total: totalFinal,
        status: 'Orcamento Valido'
    }
}

module.exports = calcularOrcamento;