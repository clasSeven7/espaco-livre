import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';

let mensagem: string;

Given('que o usuário acessa a página de login', function () {
  console.log('Acessando página de login...');
});

When(
  'ele insere o usuário {string} e a senha {string}',
  function (usuario: string, senha: string) {
    console.log(`Usuário: ${usuario}, Senha: ${senha}`);
    if (usuario === 'admin' && senha === '12345') {
      mensagem = 'Login realizado com sucesso';
    } else {
      mensagem = 'Credenciais inválidas';
    }
  }
);

Then('ele deve ver a mensagem {string}', function (mensagemEsperada: string) {
  console.log(
    `Mensagem esperada: ${mensagemEsperada}, Mensagem atual: ${mensagem}`
  );
  assert.strictEqual(mensagem, mensagemEsperada);
});
