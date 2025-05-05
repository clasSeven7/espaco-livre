import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'node:assert';

let usuarioLogado = false;
let telaAtual = '';
let mensagens: string[] = [];
let botoes: string[] = [];

Given('que o usuário não está logado na plataforma', function () {
  usuarioLogado = false;
});

Given('que o usuário está logado', function () {
  usuarioLogado = true;
});

When('ele acessa a tela de Home', function () {
  telaAtual = 'home';
  botoes = ['Buscar Espaços', 'Cadastre seu Espaço'];

  if (usuarioLogado) {
    botoes.push('buscar Espaços');
    botoes.push('Cadastre seu Espaço');
  } else {
    mensagens.push('Faça login para continuar');
  }
});

Then('ele deve ver a mensagem na tela {string}', function (mensagem) {
  assert.ok(mensagens.includes(mensagem));
});

Then('ele deve ver o botão {string}', function (texto) {
  assert.ok(botoes.includes(texto));
});

When('ele clica no botão {string}', function (texto) {
  if (texto === 'Buscar Espaços' || texto === 'Cadastre seu Espaço') {
    if (usuarioLogado) {
      telaAtual = texto === 'Buscar Espaços' ? 'busca' : 'cadastro';
      mensagens = texto === 'cadastro' ? ['Cadastre seu Espaço'] : [];
    } else {
      telaAtual = 'login';
      mensagens = ['Faça login para continuar'];
      botoes = ['Login', 'Cadastre seu Espaço'];
    }
  }
});

Then('ele deve ser redirecionado a tela de login', function () {
  assert.strictEqual(telaAtual, 'login');
});

Then('ele deve ser redirecionado para a tela de busca de Espaços', function () {
  assert.strictEqual(telaAtual, 'busca');
});

Then(
  'ele deve ser redirecionado para a tela de cadastro de Espaços',
  function () {
    assert.strictEqual(telaAtual, 'cadastro');
  }
);
