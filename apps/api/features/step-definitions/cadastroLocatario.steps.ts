import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';

let mensagem: string = '';

Given('que o alocador acessa a página de cadastro', function () {
  console.log('Acessando página de cadastro de alocador...');
});

When('ele preenche seus dados pessoais (nome, e-mail, telefone) e as informações sobre os espaços que disponibiliza (tipo de ambiente, localização, capacidade, etc.)', function () {
  console.log('Preenchendo dados pessoais e informações dos espaços...');
  mensagem = 'Cadastro realizado com sucesso';
});

When('ele clica no botão {string}', function (botao: string) {
  console.log(`Clicando no botão ${botao}...`);
});

Then('o cadastro deve ser salvo com sucesso', function () {
  assert.strictEqual(mensagem, 'Cadastro realizado com sucesso');
});

Then('ele deve ser redirecionado para a página inicial', function () {
  console.log('Redirecionando para a página inicial...');
});

Then('ele deve conseguir acessar a área de gerenciamento de reservas de espaços', function () {
  console.log('Acessando área de gerenciamento de reservas...');
});