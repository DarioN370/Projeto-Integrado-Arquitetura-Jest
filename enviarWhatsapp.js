function enviarMensagemReal(telefone, valorFinal){
    // Finge que este código demora segundos e bate na API do WhatsApp
    console.log(`CHAMADA REAL: Enviando orçamento de R$ ${valorFinal} para o número ${telefone}`);
    return true;
}

module.exports = enviarMensagemReal