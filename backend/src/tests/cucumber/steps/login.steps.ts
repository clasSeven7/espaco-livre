import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'node:assert';

Given('que o usuário acessa a página de login', async function () {
  console.log('Acessando página de login...');
});

When(
  'ele insere o usuário {string} e a senha {string}',
  async function (usuario: string, senha: string) {
    this.usuario = usuario;
    this.senha = senha;
  }
);

Then(
  'ele deve ver a mensagem de login {string}',
  async function (mensagemEsperada: string) {
    let mensagemReal = '';

    if (this.usuario === 'admin' && this.senha === 'admin') {
      mensagemReal = 'Login realizado com sucesso';
    } else {
      mensagemReal = 'Usuário ou senha inválidos';
    }

    console.log(`Mensagem exibida: ${mensagemReal}`);
    assert.strictEqual(mensagemReal, mensagemEsperada);
  }
);
