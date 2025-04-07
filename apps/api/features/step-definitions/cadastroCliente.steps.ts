import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';

let mensagem: string;

Given('que o profissional autônomo acessa a página de cadastro', function () {
  console.log('Acessando página de cadastro de profissional autônomo...');
});

When(
  'ele preenche seus dados pessoais (nome, e-mail, telefone) e suas informações profissionais (especialidade, experiência, etc.)',
  function () {
    console.log('Preenchendo dados pessoais e informações profissionais...');
  }
);

When('ele clica no botão {string}', function (botao: string) {
  console.log(`Clicando no botão ${botao}...`);
});

When(
  'ele preenche seus dados pessoais {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string} e suas informações profissionais {string}, {string}, {string}',
  function (
    nome: string,
    email: string,
    telefone: string,
    idade: string,
    endereco_residencial: string,
    cidade: string,
    cep: string,
    senha: string,
    especialidade: string,
    tipo_ocupacao: string,
    frequencia_uso: string
  ) {
    console.log(
      `Dados pessoais: ${nome}, ${email}, ${telefone}, ${idade}, ${endereco_residencial}, ${cidade}, ${cep}, ${senha}`
    );
    console.log(
      `Informações profissionais: ${especialidade}, ${tipo_ocupacao}, ${frequencia_uso}`
    );

    // Simulação de cadastro bem-sucedido
    if (
      nome &&
      email &&
      telefone &&
      idade &&
      endereco_residencial &&
      cidade &&
      cep &&
      senha &&
      especialidade &&
      tipo_ocupacao &&
      frequencia_uso
    ) {
      mensagem = 'Cadastro realizado com sucesso';
    } else {
      mensagem = 'Erro ao realizar o cadastro';
    }
  }
);

Then('ele deve ser redirecionado para a página inicial', function () {
  console.log('Redirecionando para a página inicial...');
});

Then('o cadastro deve ser salvo com sucesso', function () {
  assert.strictEqual(mensagem, 'Cadastro realizado com sucesso');
});

Then('ele deve conseguir acessar a área de reservas de espaços', function () {
  console.log('Acessando área de reservas...');
});
