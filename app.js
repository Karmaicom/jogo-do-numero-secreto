let listaDeNumerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let numeroTentativas = 0;
let numerosChutados = [];
let botaoReiniciar = document.getElementById('reiniciar');
let botaoChutar = document.getElementById('chutar');

exibirMensagemIncial();


/**
 * Exibe texto dentro de uma tag html
 * @param {*} tag 
 * @param {*} texto 
 */
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.0});
}

/**
 * Verifica se o botão foi clicado
 */
function verificarChute() {
    numeroTentativas++;
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {

        exibirTextoNaTela('h1', "Acertou!");
        
        exibirTextoNaTela('p', `Você descobriu o número secreto com 
            ${numeroTentativas} ${numeroTentativas > 1?'tentativas':'tentativa'}!`);
        numeroTentativas = 0;

        botaoReiniciar = document.getElementById('reiniciar');
        botaoReiniciar.removeAttribute('disabled');
        botaoChutar.setAttribute('disabled', false);

    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor que o chute!');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior que o chute!');
        }

        limparCampo();
    }
}

function limparCampo() {
    document.querySelector('input').value = '';
}


/**
 * 
 * @returns Número aleatório entre 1 e 10
 */
function gerarNumeroAleatorio() {
    let numeroSorteado = parseInt(Math.random() * 10 + 1);
    let qtdElementosLista = listaDeNumerosSorteados.length;

    if (listaDeNumerosSorteados.includes(numeroSorteado)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroSorteado);
        return numeroSorteado;
    }
    
    return numeroSorteado;
}

/**
 * Limpar o console após 500 milisegundos
 */
let millisecondsToWait = 500;
setTimeout(function() {
    console.clear();
}, millisecondsToWait);


function exibirMensagemIncial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

/**
 * Utilizado no botão 'Novo Jogo'
 */
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    exibirMensagemIncial();
    botaoChutar.removeAttribute('disabled');
    botaoReiniciar.setAttribute('disabled', true);
}
