import { Given, When } from '@cucumber/cucumber';

let dadosCliente: Record<string, string> = {};

Given(
  'que o profissional autônomo (Cliente) acessa a página de cadastro',
  async function () {
    console.log('Cliente acessou a página de cadastro.');
  }
);

When(
  'ele preenche seus dados pessoais: e-mail, senha, usuário, telefone, idade, endereço, cidade, CEP',
  async function () {
    dadosCliente = {
      email: 'cliente@email.com',
      senha: 'senha123',
      usuario: 'cliente01',
      telefone: '(83) 99876-5432',
      idade: '28',
      endereco: 'Av. Principal, 456',
      cidade: 'Campina Grande',
      cep: '58400-000',
    };

    console.log('Dados preenchidos:', dadosCliente);
  }
);

When('o cliente clica no botão {string}', async function (botao: string) {
  if (botao === 'Cadastrar') {
    console.log('Botão "Cadastrar" clicado. Enviando dados...');
    console.log('Dados enviados com sucesso:', dadosCliente);
  } else {
    throw new Error(`Botão "${botao}" não reconhecido.`);
  }
});
