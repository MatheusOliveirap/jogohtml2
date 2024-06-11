// Elementos do DOM
const telaBoasVindas = document.getElementById('tela-de-boas-vindas');
const telaJogo = document.getElementById('tela-do-jogo');
const telaResultado = document.getElementById('tela-de-resultado');
const telaPontuacao = document.getElementById('tela-de-pontuacao');
const listaDePontuacao = document.getElementById('lista-de-pontuacao');

const formularioBoasVindas = document.getElementById('formulario-de-boas-vindas');
const entradaNomeUsuario = document.getElementById('nome-usuario');
const mensagemBoasVindas = document.getElementById('mensagem-de-boas-vindas');

const entradaAdivinhacao = document.getElementById('entrada-adivinhacao');
const botaoAdivinhar = document.getElementById('botao-adivinhar');
const mensagemFeedback = document.getElementById('mensagem-de-feedback');

const mensagemResultado = document.getElementById('mensagem-de-resultado');
const numeroCorretoDisplay = document.getElementById('numero-correto');
const mensagemPontuacao = document.getElementById('mensagem-de-pontuacao');

const botaoJogarNovamente = document.getElementById('botao-jogar-novamente');
const botaoVerPontuacao = document.getElementById('botao-ver-pontuacao');
const botaoVoltar = document.getElementById('botao-voltar');

// Variáveis do jogo
let numeroCorreto;
let tentativas;
let nomeUsuario;
let pontuacoes = JSON.parse(localStorage.getItem('pontuacoes')) || [];

// Event listener para o formulário de boas-vindas
formularioBoasVindas.addEventListener('submit', (event) => {
    event.preventDefault();
    nomeUsuario = entradaNomeUsuario.value;
    if (nomeUsuario) {
        iniciarJogo();
    }
});

// Event listener para o botão "Adivinhar"
botaoAdivinhar.addEventListener('click', () => {
    const palpite = parseInt(entradaAdivinhacao.value);
    if (isNaN(palpite) || palpite < 1 || palpite > 100) {
        mensagemFeedback.textContent = 'Por favor, insira um número válido entre 1 e 100.';
        return;
    }
    tentativas++;
    if (palpite === numeroCorreto) {
        finalizarJogo();
    } else if (palpite < numeroCorreto) {
        mensagemFeedback.textContent = 'O número correto é maior.';
    } else {
        mensagemFeedback.textContent = 'O número correto é menor.';
    }
});

// Event listener para o botão "Jogar Novamente"
botaoJogarNovamente.addEventListener('click', iniciarJogo);

// Event listener para o botão "Ver Pontuação"
botaoVerPontuacao.addEventListener('click', () => {
    exibirPontuacao();
});

// Event listener para o botão "Voltar"
botaoVoltar.addEventListener('click', () => {
    trocarTela(telaBoasVindas);
});

// Função para iniciar o jogo
function iniciarJogo() {
    numeroCorreto = Math.floor(Math.random() * 3) + 1;
    tentativas = 0;
    mensagemBoasVindas.textContent = `Bem-vindo, ${nomeUsuario}!`;
    mensagemFeedback.textContent = '';
    entradaAdivinhacao.value = '';
    trocarTela(telaJogo);
}

// Função para finalizar o jogo
function finalizarJogo() {
    mensagemResultado.textContent = `Parabéns, ${nomeUsuario}! Você acertou o número!`;
    numeroCorretoDisplay.textContent = `O número correto era: ${numeroCorreto}`;
    mensagemPontuacao.textContent = `Você fez ${tentativas} tentativa(s).`;

    pontuacoes.push({ nome: nomeUsuario, tentativas });
    pontuacoes.sort((a, b) => a.tentativas - b.tentativas);
    localStorage.setItem('pontuacoes', JSON.stringify(pontuacoes));

    trocarTela(telaResultado);
}

// Função para exibir a pontuação
function exibirPontuacao() {
    listaDePontuacao.innerHTML = '';
    pontuacoes.forEach(pontuacao => {
        const li = document.createElement('li');
        li.textContent = `${pontuacao.nome}: ${pontuacao.tentativas} tentativas`;
        listaDePontuacao.appendChild(li);
    });
    trocarTela(telaPontuacao);
}

// Função para trocar de tela
function trocarTela(tela) {
    telaBoasVindas.classList.remove('ativa');
    telaJogo.classList.remove('ativa');
    telaResultado.classList.remove('ativa');
    telaPontuacao.classList.remove('ativa');
    tela.classList.add('ativa');
}

// Inicia o jogo com a tela de boas-vindas
trocarTela(telaBoasVindas);
